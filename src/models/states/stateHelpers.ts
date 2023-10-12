import State from "./state"
import { Symbol } from "../memory/memory"

export function getAllSymbols(src: State, dest: State) : {forward : Symbol[], backward: Symbol[]}{
    const forward : Symbol[] = []
    const backward : Symbol[] = []

    for(let _sym of src.transitions.keys()){
        let T = src.transitions.get(_sym)!
        if (T.includes(dest)){
            forward.push(_sym)
        }
    }

    if (src !== dest) {
        for(let _sym of dest.transitions.keys()){
            let T = dest.transitions.get(_sym)!
            if (T.includes(src)){
                backward.push(_sym)
            }
        }
    }

    return {
        forward: forward,
        backward: backward
    }
}

export function hasTransitions(src: State, dest: State) : boolean {
    for(let _sym of src.transitions.keys()){
        let T = src.transitions.get(_sym)!
        if (T.includes(dest)){
            return true
        }
    }

    if (src !== dest) {
        for(let _sym of dest.transitions.keys()){
            let T = dest.transitions.get(_sym)!
            if (T.includes(src)){
                return true
            }
        }
    }

    return false
}

export function getAllNeighbors(state : State) : Set<State> {
    const N = new Set<State>()

    for(let _sym of state.transitions.keys()){
        let T = state.transitions.get(_sym)!
        for(let dest of T){
            N.add(dest)
        }
    }

    return N
}

export function getCommonNeighbors(p: State, q : State) : Set<State> {
    const N1 = getAllNeighbors(p)
    const N2 = getAllNeighbors(q)

    return new Set([...N1].filter(x => N2.has(x)));
}