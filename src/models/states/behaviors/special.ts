import { Symbol } from "../../memory/memory";
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME, StateType } from "../state";

export function isAcceptState(state: State){
    return state.accept == true && state.command == ACCEPT_STATE_NAME
}

export function isRejectState(state: State){
    return state.accept == false && state.command == REJECT_STATE_NAME
}

export function makeStateInitial(state : State): State {
    state.initial = true 
    return state
}

export function defaultState(name: string, command : string = "", type = StateType.READ) : State{
    if (command == ""){
        command = name 
        name = ""
    }

    return {
        name: name,
        command: command,
        accept: false,
        initial: false,
        run: () => [],
        transitions: new Map<Symbol, State[]>(),
        isND: false,
        type: type,
        mem: undefined,
        isActive: false
    }
}

export function acceptState() : State{
    const state = defaultState("", ACCEPT_STATE_NAME)
    state.accept = true

    state.run = () => {
        return []
    }
    return state
}

export function rejectState() : State{
    const state = defaultState("", REJECT_STATE_NAME)

    state.run = () => {
        return []
    }

    return state
}