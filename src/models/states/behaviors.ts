import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./state";
import { Symbol } from "../memory/memory";

export function defaultState(name: string, command : string = "") : State{
    if (command == ""){
        command = name 
        name = ""
    }

    return {
        name: name,
        command: command,
        accept: false,
        initial: false,
        behavior: (input : Symbol) => null,
        transitions: new Map<Symbol, State[]>(),
        mem: undefined
    }
}

export function acceptState() : State{
    const state = defaultState("", ACCEPT_STATE_NAME)
    state.accept = true

    return state
}

export function rejectState() : State{
    const state = defaultState("", REJECT_STATE_NAME)

    return state
}

export function makeStateInitial(state : State): State {
    state.initial = true 
    return state
}

export function scanState(name : string) : State {
    const state = defaultState("", name)

    return state
}