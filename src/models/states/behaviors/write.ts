import { IMemoryDetais, getDetails, loadToMemory } from "~/models/memory/memory"
import Tape from "~/models/memory/tape"
import State, { StateOutput } from "../state"
import { defaultState } from "./special"

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