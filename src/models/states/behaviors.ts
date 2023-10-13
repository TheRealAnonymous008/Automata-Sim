import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME, StateOutput } from "./state";
import Memory, { DELIMITER, IMemoryDetais, Symbol, getDetails, loadToMachine, loadToMemory } from "../memory/memory";
import Tape2D from "../memory/tape2d";
import Tape from "../memory/tape";
import { getKeysInMap } from "~/utils/dictToList";

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

    state.run = () => {
        return []
    }
    return state
}

export function rejectState() : State{
    const state = defaultState("", REJECT_STATE_NAME)

    state.run = () => {
        return []
    }

    return state
}

export function makeStateInitial(state : State): State {
    state.initial = true 
    return state
}

export function scanState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "scan")

    state.mem = mem
    state.run = () : StateOutput[] => {
        mem.right()
        const s = mem.read()

        const t = state.transitions.get(s)

        if (t === undefined)
            return []

        const output : StateOutput[] = []
        
        t.forEach((val) => {
            output.push({
                state: val, 
                memory: getDetails(mem)
            })
        })

        return output
    }

    return state
}

// Note: We assume that we print only the first symbol to be passed. 
// Otherwise we have undefined behavior
export function printState(name : string, mem : Tape) : State {
    const state = defaultState(name, "print")

    state.mem = mem
    state.run = () : StateOutput[] => {
        const output : StateOutput[] = []
        const memImage : IMemoryDetais = getDetails(state.mem!)

        state.transitions.forEach((t, s) => {
            loadToMemory(state.mem!, memImage)
            state.mem!.write(s)

            if (t === undefined)
                return    
            
            t.forEach((val) => {
                output.push({
                    state: val, 
                    memory: getDetails(mem)
                })
            })
        })

        return output
    }
    
    return state
}