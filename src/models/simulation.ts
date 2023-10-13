import { Machine, setCurrentState } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[]
}

export function resetMachine(machine : Machine) {
  // Set all states as not current
  machine.states.forEach((val) => {val.isActive = false})
  machine.currentState = machine.initial
  setCurrentState(machine, machine.initial)
  machine.input.resetHead!()
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
        next: []
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
    // Start at the initial state. Make sure input tape is properly set

    const next = machine.currentState.run()
    let snapshot = createSnapshot(machine)
    next.forEach((val) => {
      setCurrentState(machine, val)
      let child = runMachine(machine)
      loadSnapshot(machine, snapshot)
      snapshot.next.push(child)
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
    if (node.state.accept == true && node.state.command == ACCEPT_STATE_NAME){
      return MachineResult.ACCEPT
    }
    if (node.state.accept == false && node.state.command == REJECT_STATE_NAME){
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
      case MachineResult.ACCEPT: return MachineResult.ACCEPT
      case MachineResult.REJECT: return MachineResult.REJECT
      default: {
        for(let x of node.next){
          const childResult = evaluateTree(x)
          if (childResult === MachineResult.ACCEPT){
            return MachineResult.ACCEPT
          }
        }
        return MachineResult.REJECT
      }
    }
}