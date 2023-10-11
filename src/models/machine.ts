import Memory from "./memory/memory"
import State from "./states/state";

export interface Machine {
    memory : MemoryList,
    states : StateList,
    input: Memory
}

export type MemoryList = {[key : string] : Memory}
export type StateList = {[key: string] : State}