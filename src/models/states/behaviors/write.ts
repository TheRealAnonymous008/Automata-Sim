import { DELIMITER, IMemoryDetais, getDetails, loadToMemory } from "~/models/memory/memory"
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
            loadToMemory(mem, memImage)
            mem.write(s)

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