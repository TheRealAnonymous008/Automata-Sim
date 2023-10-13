import { Machine, setCurrentState } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import { isAcceptState, isRejectState } from "./states/special";
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[],
    parent: SimulationNode | null,
    accept: boolean,
    depth: number,
    visited : boolean
}

export function resetMachine(machine : Machine) {
  // Set all states as not current
  machine.states.forEach((val) => {val.isActive = false})
  setCurrentState(machine, machine.initial)
  machine.input.resetHead!()

  const contents = machine.input.contents
  machine.memory.forEach((mem) => mem.flush())
  machine.input.contents = contents
}

export function createSnapshot(machine : Machine) : SimulationNode{
    const arr : IMemoryDetais[] = new Array()
      machine.memory.forEach((val, key) => {
      const contents : any[] = []
      val.contents.forEach((e) => contents.push(e))
      arr.push({
        key: key,
        contents: contents,
        head: val.head, 
        name: val.name
      })
    })

    return {
        memory : arr,
        state: machine.currentState, 
        next: [],
        parent: null,
        accept: false,
        depth: 0,
        visited: false
    }
}

export function loadSnapshot(machine: Machine, snapshot: SimulationNode){
  snapshot.memory.forEach((value) => {
    const memory = machine.memory.get(value.key!)!
    memory.contents = value.contents
    memory.head = value.head
  })

  setCurrentState(machine, snapshot.state)
}

export default function runMachine(machine : Machine) : SimulationNode{
    let snapshot = createSnapshot(machine)
    const next = machine.currentState.run()

    next.forEach((val) => {
      setCurrentState(machine, val)
      let child = runMachine(machine)
      child.parent = snapshot
      child.depth = child.parent.depth + 1
      snapshot.next.push(child)

      snapshot.accept = snapshot.accept || child.accept
      loadSnapshot(machine, snapshot)
    })

    var evaluation = evaluateNode(snapshot)
    if (next.length === 0 && evaluation == MachineResult.ACCEPT){
      snapshot.accept = true
    }

    return snapshot
}

export enum MachineResult  {
  ACCEPT = 0,
  REJECT = 1,
  CONTINUE = 2,
}

export function evaluateNode(node: SimulationNode){
    if (isAcceptState(node.state)){
      return MachineResult.ACCEPT
    }
    if (isRejectState(node.state)){
      return MachineResult.REJECT
    }
    return MachineResult.CONTINUE
} 

export function getShortestDerivation(node: SimulationNode) : SimulationNode {
    const queue: SimulationNode[] = [node];
    node.visited = true;
    let derivation: SimulationNode | null = null
    let shortestLeaf: SimulationNode | null = null

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const res = evaluateNode(currentNode)

      if (res == MachineResult.ACCEPT) {
        derivation = currentNode
        break
      }
      
      if (currentNode.next.length === 0 && shortestLeaf === null){
        shortestLeaf = currentNode
      }

      for (const nextNode of currentNode.next) {
        if (!nextNode.visited) {
          queue.push(nextNode);
          nextNode.visited = true;
        }
      }
    }

    let target = null 

    // If a derivation exists, use that instead
    if (derivation !== null) {
      target = derivation
    }

    // Perform a traversal to the shortest leaf instead
    else {
      target = shortestLeaf
    } 

    // Now get a path starting from the node down to the target.
    const path: SimulationNode[] = [];
    let currentNode: SimulationNode | null = target;

    while (currentNode) {
      const copy = {...currentNode}
      copy.next = []
      copy.parent = null

      path.unshift(copy);
      currentNode = currentNode.parent;
    }

    // Finally, connect the nodes and output a copy of the path. 
    for (let i = 0; i < path.length - 1; ++i){
      path[i].next = [path[i + 1]]
    }

    for (let i = 1; i < path.length; ++i){
      path[i].parent = path[i - 1]
    }
    
    return path[0]
}