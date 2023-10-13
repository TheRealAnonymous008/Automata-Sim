import Memory, { IMemoryDetais, Symbol, getDetails, loadToMemory } from "~/models/memory/memory"
import Tape from "~/models/memory/tape"
import State, { StateOutput } from "../state"
import { defaultState } from "./special"
import Stack from "~/models/memory/stack"
import Queue from "~/models/memory/queue"
import Tape2D from "~/models/memory/tape2d"

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
            mem.write(s as Symbol)

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

export function rightState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "R")

    state.mem = mem
    state.run = () : StateOutput[] => {
        const output : StateOutput[] = []
        state.transitions.forEach((v, k) => {
            const [rs, ws] = k as [Symbol, Symbol]
            
            // Perform read
            mem.right()
            const sym = mem.read()

            if (rs === sym ) {
                // Perofrm write
                const memImage : IMemoryDetais = getDetails(mem)
                if (rs !== ws) {
                    loadToMemory(mem, memImage)
                    mem.replace(ws)
                } 
                
                v.forEach((val) => {
                    output.push({
                        state: val, 
                        memory: getDetails(mem)
                    })
                })

                mem.replace(rs)
            }

            mem.left()

        })
        return output
    }

    return state
}


export function leftState(name : string, mem : Tape | Tape2D) : State {
    const state = defaultState(name, "R")

    state.mem = mem
    state.run = () : StateOutput[] => {
        const output : StateOutput[] = []
        state.transitions.forEach((v, k) => {
            const [rs, ws] = k as [Symbol, Symbol]
            
            // Perform read
            mem.left()
            const sym = mem.read()

            if (rs === sym ) {
                // Perofrm write
                const memImage : IMemoryDetais = getDetails(mem)
                if (rs !== ws) {
                    loadToMemory(mem, memImage)
                    mem.replace(ws)
                } 
                
                v.forEach((val) => {
                    output.push({
                        state: val, 
                        memory: getDetails(mem)
                    })
                })
                
                mem.replace(rs)
            }

            mem.right()

        })
        return output
    }

    return state
}