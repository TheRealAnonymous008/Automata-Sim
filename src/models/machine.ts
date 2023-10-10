import Memory from "./memory/memory"
import State from "./states/state";

export interface Machine {
    memory : Memory[],
    states : State[],
}