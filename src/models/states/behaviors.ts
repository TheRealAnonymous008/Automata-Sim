import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./state";
import Memory, { Symbol } from "../memory/memory";
import Tape2D from "../memory/tape2d";
import Tape from "../memory/tape";

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
        behavior: () => null,
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

export function scanState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "scan")

    state.mem = mem
    state.behavior = () => {
        return mem.read()
    }

    return state
}

export function printState(name : string, mem : Tape) : State {
    const state = defaultState(name, "print")

    state.mem = mem
    state.behavior = (s : Symbol) => {
        mem.write(s)
    }
    
    return state
}