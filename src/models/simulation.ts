import { Machine } from "./machine";
import Memory, { IMemoryDetais } from "./memory/memory";
import State from "./states/state";
import { getValuesInMap } from "~/utils/dictToList";

export interface SimulationNode {
    state : State,
    memory : Memory[]
    next: SimulationNode[]
}

export function createSnapshot(machine : Machine) {
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
        memory : arr    
    }
}

export default function simulate(machine : Machine){
    // Start at the initial state
    
}