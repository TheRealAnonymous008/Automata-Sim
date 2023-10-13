import Coordinate from "~/utils/Coordinate";
import Memory, { Symbol } from "../memory/memory";

export interface IStateDetails {
    name : string,
    accept: boolean,
    command: string,
    initial: boolean,
    isActive: boolean,
    loc: Coordinate,
}

export default interface State {
    name : string,
    transitions : Map<Symbol, State[]>,
    mem? : Memory,
    command : string,
    accept : boolean,
    initial : boolean,
    run: () => State[]
    isActive : boolean
}

export interface Transition {
    start : State,
    symbol : Symbol,
    dest : State
}

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

