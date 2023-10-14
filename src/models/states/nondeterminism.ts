import { getKeysInMap, getValuesInMap } from "~/utils/dictToList";
import { Machine } from "../machine/machine";
import State, { StateType, TransitionSymbol } from "./state";
import { Symbol } from "../memory/memory";
import { isEqualSets } from "~/utils/arrayHelper";

export function getNondeterminism(machine : Machine) {
    machine.states.forEach((state) => {
        state.isND = isNonDeterministic(state)
    })
}

function isNonDeterministic(state: State) : boolean{
    if (! state.mem){
        return false 
    }

    const T = state.transitions
    const inputs = state.mem!.inputAlphabet

    switch(state.type){
        case StateType.READ:
            return isNDRead(T, inputs)
        case StateType.WRITE:
            return isNDPrint(T)
        case StateType.READ_WRITE:
            return isNDReadWrite(T as Map<[Symbol, Symbol], State[]>, inputs)
    }
}

function isNDRead(map: Map<TransitionSymbol, State[]>, alphabet : Set<Symbol>) : boolean{
    for (let sym of alphabet.values()){
        // Case 1: No transitions
        if (!map.has(sym))
            return true 
        // Case 2: Many Transitions
        if (map.get(sym)!.length > 1){
            return true 
        }
    }
    return false
}

function isNDPrint(map: Map<TransitionSymbol, State[]>) : boolean {
    // Case 3a: Nondeterminism in output. There should only be at most one output transition
    if (map.size > 1){
        return true
    }

    // Case 3b: ...and only one transition 
    const V = getValuesInMap(map)[0]
    if (V.length > 1){
        return true
    }

    return false
}

function isNDReadWrite(map: Map<[Symbol, Symbol], State[]>, alphabet : Set<Symbol>) : boolean{ 
    // Case 4: Nondeterministic read write. Redundant read symbols (i.e.,
    // if 1/X and 1/Y are transition symbols, then we have)
    // Nondeterminism
    const keys = getKeysInMap(map)
    const readSymbols = new Set<Symbol>()

    for(let [r, w] of keys){
        if (readSymbols.has(r)){
            return true 
        }
        readSymbols.add(r)
    }

    // Case 5: Incomplete symol set
    if(isEqualSets(alphabet, readSymbols)){
        return true
    }

    return false
}
