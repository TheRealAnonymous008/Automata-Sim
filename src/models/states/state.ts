import Memory, { Symbol } from "../memory/memory";

export default interface State {
    name : string,
    transitions : Map<Symbol, State[]>,
    mem? : Memory,
    command : string,
    accept : boolean,
    initial : boolean,
}

export interface Transition {
    start : State,
    symbol : Symbol,
    dest : State
}

export function getAllTransitions(src: State, dest: State) : {forward : Symbol[], backward: Symbol[]}{
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