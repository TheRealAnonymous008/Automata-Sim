import { Machine } from "../machine/machine";
import State from "./state";

export function getNondeterminism(machine : Machine) {
    machine.states.forEach((state) => {
        state.isND = isNonDeterministic(state)
    })
}

function isNonDeterministic(state: State) : boolean{
    // Type 1: Can transition to more than one state

    // Type 2: Can transition to zero states from symbol.

    // Type 3: Special types of Non determinism (applicable for states that perform read / write)

    return false
}
