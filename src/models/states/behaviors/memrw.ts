import Memory, { IMemoryDetais, getDetails, loadToMemory } from "~/models/memory/memory"
import Tape from "~/models/memory/tape"
import State, { StateOutput } from "../state"
import { defaultState } from "./special"
import Stack from "~/models/memory/stack"
import Queue from "~/models/memory/queue"

export function readState(name : string, mem : Stack | Queue) : State {
    const state = defaultState(name, "R")

    state.mem = mem
    state.run = () : StateOutput[] => {
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

export function writeState(name : string, mem : Stack | Queue) : State {
    const state = defaultState(name, "W")

    state.mem = mem
    state.run = () : StateOutput[] => {
        const output : StateOutput[] = []

        state.transitions.forEach((t, s) => {
            mem.write(s)

            t.forEach((val) => {
                output.push({
                    state: val, 
                    memory: getDetails(mem)
                })
            })

            mem.unwrite()
        })
        return output
    }
    
    return state
}