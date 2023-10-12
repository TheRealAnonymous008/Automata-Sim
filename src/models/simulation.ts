import { Machine } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import State from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[]
}

export function resetMachine(machine : Machine) {
  machine.currentState = machine.initial
  machine.currentSymbol = null
  machine.input.resetHead!()
}

export function createSnapshot(machine : Machine) : SimulationNode{
    const arr : IMemoryDetais[] = new Array()
    getValuesInMap(machine.memory).forEach((val) => {
      const contents : any[] = []
      val.contents.forEach((e) => contents.push(e))
      arr.push({
        contents: contents,
        head: val.getHead(), 
        name: val.name
      })
    })

    return {
        memory : arr,
        state: machine.currentState, 
        next: []
    }
}

export default function simulate(machine : Machine){
    // Start at the initial state. Make sure input tape is properly set
    console.log("One step")
    
    let current = machine.currentState
    let newSymbol = current.behavior("a")
}