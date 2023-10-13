import { Machine, setCurrentState } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import { isAcceptState, isRejectState } from "./states/special";
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[],
    parent: SimulationNode | null
    path: boolean
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
        path: false,
        parent: null
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
      snapshot.next.push(child)
      loadSnapshot(machine, snapshot)
    })

    
    return snapshot
}

export enum MachineResult  {
  ACCEPT = 0,
  REJECT = 1,
  CONTINUE = 2,
  SOFT_ACCEPT = 3
}

export function evaluateNode(node: SimulationNode){
    if (isAcceptState(node.state)){
      return MachineResult.ACCEPT
    }
    if (isRejectState(node.state)){
      return MachineResult.REJECT
    }
    if (node.state.accept == true) {
      return MachineResult.SOFT_ACCEPT
    }
    return MachineResult.CONTINUE
} 

export function evaluateTree(node: SimulationNode) : MachineResult {
    const res = evaluateNode(node)

    switch(res){
      case MachineResult.ACCEPT: {
        node.path = true
        return MachineResult.ACCEPT
      }
      case MachineResult.REJECT: return MachineResult.REJECT
      default: {
        for(let x of node.next){
          const childResult = evaluateTree(x)
          if (childResult === MachineResult.ACCEPT){
            node.path = true
            return MachineResult.ACCEPT
          }
        }
        return MachineResult.REJECT
      }
    }
}