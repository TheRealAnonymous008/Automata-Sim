import Memory from "../memory/memory";

export default interface State {
    name : string,
    transitions : {[key : string]: State[]},
    mem? : Memory,
    command : () => string,
    accept : boolean,
    initial : boolean,
}

export interface Transition {
    start : State,
    symbol : Symbol,
    dest : State
}