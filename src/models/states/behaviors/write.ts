import { DELIMITER, Symbol, IMemoryDetais, getDetails, loadToMemory } from "~/models/memory/memory"
import Tape from "~/models/memory/tape"
import State, { StateOutput } from "../state"
import { defaultState } from "./special"

export function printState(name : string, mem : Tape) : State {
    const state = defaultState(name, "print")

    state.mem = mem
    state.run = () : StateOutput[] => {
        const output : StateOutput[] = []
        const memImage : IMemoryDetais = getDetails(mem)

        state.transitions.forEach((t, s) => {
            mem.write(s as Symbol)

            t.forEach((val) => {
                output.push({
                    state: val, 
                    memory: getDetails(mem)
                })
            })

        })
        
        loadToMemory(mem, memImage)
        return output
    }
    
    return state
}