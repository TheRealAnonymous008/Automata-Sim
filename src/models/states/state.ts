import Memory from "../memory/memory";

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

export default interface State {
    name : string,
    transitions : {[key : string]: State[]},
    mem? : Memory
}

export interface Transition {
    start : State,
    symbol : Symbol,
    dest : State
}