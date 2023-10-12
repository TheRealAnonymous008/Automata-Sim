import { Machine } from "./machine";
import Memory from "./memory/memory";
import State from "./states/state";

export interface SimulationNode {
    state : State,
    memory : Memory[]
    next: SimulationNode[]
}

export default function simulate(machine : Machine){
    // Start at the initial state
    
}