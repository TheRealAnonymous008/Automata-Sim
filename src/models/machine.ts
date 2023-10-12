import Memory, {Symbol} from "./memory/memory"
import State, { Transition } from "./states/state";

export interface Machine {
    memory : MemoryList,
    states : StateList,
    input: Memory,
    initial: State,
    currentState: State,
    currentSymbol: Symbol
}

export type MemoryList = Map<string, Memory>
export type StateList = Map<string, State>

export function getAllTransitions(machine : Machine) : Transition[] {
    let T : Transition[] = []

    for (let _src of machine.states.values()) {
        for(let _sym of _src.transitions.keys()){
            let D  = _src.transitions.get(_sym)
            for (let _dest of D!) {
                T.push({
                    start: _src,
                    symbol: _sym,
                    dest: _dest
                })
            }
        }
    };

    return T
}

export function setCurrentState(machine : Machine, state : State){
    machine.currentState.isActive = false
    machine.currentState = state 
    state.isActive  = true
}