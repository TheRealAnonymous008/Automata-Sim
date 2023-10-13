import { IMemoryDetais } from "../memory/memory"
import State from "../states/state"
import { Machine, setCurrentState } from "./machine"

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[],
    parent: SimulationNode | null,
    accept: boolean,
    depth: number,
    visited : boolean
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
