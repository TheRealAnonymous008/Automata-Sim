import { Machine } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import State from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : IMemoryDetais[]
    next: SimulationNode[]
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
        state: machine.current, 
        next: []
    }
}

export default function simulate(machine : Machine){
    // Start at the initial state. Make sure input tape is properly set
    let current = machine.current
    machine.input.resetHead!()
    
}