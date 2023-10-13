import Coordinate from "~/utils/Coordinate";
import Memory, { IMemoryDetais, Symbol } from "../memory/memory";

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
    transitions : Map<TransitionSymbol, State[]>,
    mem? : Memory,
    command : string,
    accept : boolean,
    initial : boolean,
    run: () => StateOutput[]
    isActive : boolean
}

export type TransitionSymbol = Symbol | [Symbol, Symbol] 

export interface Transition {
    start : State,
    symbol : TransitionSymbol,
    dest : State
}

export interface StateOutput {
    state: State
    memory: IMemoryDetais
}

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

export function getTransitionStr(sym : TransitionSymbol) {
    if (sym == null)
        return ""
    if (typeof(sym) == "object"){
        if(sym![0] !== sym![1])
            return sym![0] + "/" + sym![1]
        return sym[0]
    } 
    return sym
}
