import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "./state";

export function isAcceptState(state: State){
    return state.accept == true && state.command == ACCEPT_STATE_NAME
}

export function isRejectState(state: State){
    return state.accept == false && state.command == REJECT_STATE_NAME
}