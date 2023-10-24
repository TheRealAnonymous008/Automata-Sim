import State, { StateOutput, StateType } from "../state";
import Tape2D from "../../memory/tape2d";
import Tape from "../../memory/tape";
import { getDetails } from "~/models/memory/memory";
import { defaultState } from "./special";

export function scanState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "scan", StateType.READ)

    state.mem = mem
    state.run = () : StateOutput[] => {
        const s = mem.read()
        mem.right()

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

export function scanRightState(name : string, mem : Tape | Tape2D) : State {
    const state = scanState(name, mem)
    state.command = "SR"
    return state
}

export function scanLeftState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "SL", StateType.READ)

    state.mem = mem
    state.run = () : StateOutput[] => {
        mem.left()
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