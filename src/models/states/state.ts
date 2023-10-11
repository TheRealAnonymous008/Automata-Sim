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