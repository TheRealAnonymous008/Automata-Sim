import Memory, { Symbol } from "../memory/memory";

export default interface State {
    name : string,
    transitions : Map<Symbol, State[]>,
    mem? : Memory,
    command : string,
    accept : boolean,
    initial : boolean,
    behavior: (() => Symbol) | 
        ((input: Symbol) => void),
    isActive : boolean
}

export interface Transition {
    start : State,
    symbol : Symbol,
    dest : State
}

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

