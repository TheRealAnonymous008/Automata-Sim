import { Machine } from "~/models/machine";
import StateComponent, { STATE_CIRCRADIUS } from "./StateComponent";
import State from "~/models/states/state";
import { For, Ref } from "solid-js";
import { getValuesInMap } from "~/utils/dictToList";
import { Symbol } from "~/models/memory/memory";
import TransitionComponent from "./TransitionComponent";
import Coordinate from "./Coordinate";

export default function StateDiagram(props :{
    machine : Machine
}){
    let cw = 1000
    let ch = 1000

    let stateCoordMap : StateCoordMap = new Map<State, Coordinate>()

    getValuesInMap(props.machine.states).forEach((val, idx) => {
        stateCoordMap.set(val, generateRandomCoord(cw, ch))
    })

    return (
        <>
            <h2> State Diagram </h2>
            <svg width={ch} height={ch}>
                {/* Plot transitions. Plot them first so that they are at the bottom */}
                {/* Plot states */}
                <For each={getValuesInMap(props.machine.states)}>
                    {(item : State, index) => 
                        <StateComponent 
                            state={item} 
                            loc = {stateCoordMap.get(item)!}
                        />
                    }
                </For>  
            </svg>
        </>
    )
}   

type StateCoordMap = Map<State, Coordinate>
type TransitionUIHelper = {
    symbols : Symbol[],
    source : State,
    dest: State
}

function generateRandomCoord(mw : number, mh : number) : Coordinate{
    return {
        x : (mw - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS,
        y : (mh - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS
    }
}