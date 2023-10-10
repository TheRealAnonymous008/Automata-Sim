import Memory from "./memory/memory"
import State from "./states/state";

export interface Machine {
    memory : MemoryList,
    states : State[],
}

export type MemoryList = {[key : string] : Memory}