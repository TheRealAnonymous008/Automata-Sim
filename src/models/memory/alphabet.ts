import { Machine } from "../machine/machine";
import { TransitionSymbol } from "../states/state";
import { Symbol } from "./memory";

export default function finalizeAlphabets(machine : Machine){
    machine.states.forEach((state) => {
        state.transitions.forEach((_,  key: TransitionSymbol) => {
            var readSymbol : Symbol = ""
            var writeSymbol : Symbol = ""
            if (key instanceof Object){
                readSymbol = key[0]
                writeSymbol = key[0]
            } else {
                readSymbol = key 
                writeSymbol = key
            }

            if(state.mem){
                state.mem.inputAlphabet.add(readSymbol)
                state.mem.outputAlphabet.add(writeSymbol)
            }
        }) 
    })
}