import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./state";
import Memory, { DELIMITER, Symbol } from "../memory/memory";
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
        run: () => [],
        transitions: new Map<Symbol, State[]>(),
        mem: undefined,
        isActive: false
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
    state.run = () => {
        mem.right()
        const s = mem.read()
        // If the end of the string was reached go one step left
        if (s == DELIMITER){
            mem.left()
        }

        const t = state.transitions.get(s)

        if (t === undefined)
            return []
        return t
    }

    return state
}

export function printState(name : string, mem : Tape) : State {
    const state = defaultState(name, "print")

    state.mem = mem
    state.run = () => {
        // mem.write(s)
        return []
    }
    
    return state
}