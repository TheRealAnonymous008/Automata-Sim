import { Machine } from "~/models/machine";
import StateComponent, { STATE_CIRCRADIUS } from "./StateComponent";
import State, { getAllTransitions } from "~/models/states/state";
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

    // Layout the states
    let stateCoordMap : StateCoordMap = new Map<State, Coordinate>()
    getValuesInMap(props.machine.states).forEach((val, idx) => {
        stateCoordMap.set(val, generateRandomCoord(cw, ch))
    })

    // Layout the transitions
    let transitionUIs : TransitionUIHelper[] = getAllTransitionUIs(props.machine)

    return (
        <>
            <h2> State Diagram </h2>
            <svg width={ch} height={ch}>
                {/* Plot transitions. Plot them first so that they are at the bottom */}
                <For each={transitionUIs}>
                    {
                        (item : TransitionUIHelper) => {
                            console.log(item)
                            return <TransitionComponent 
                                src={stateCoordMap.get(item.source)!}
                                dest={stateCoordMap.get(item.dest)!}
                            />
                        }
                    }
                </For>

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
    forward : Symbol[],
    backward : Symbol[],
    source : State,
    dest: State,
}

function getAllTransitionUIs(machine : Machine) : TransitionUIHelper[]{
    const S = getValuesInMap(machine.states)
    const TU : TransitionUIHelper[] = []

    S.forEach((src, idx) => {
        S.forEach((dest, jdx) => {
            if (jdx >= idx) {
                const tlist = getAllTransitions(src, dest)
                const forward = tlist.forward
                const backward = tlist.backward

                if (forward.length > 0 || backward.length > 0) {
                    TU.push({
                        source: src,
                        dest: dest, 
                        backward: backward,
                        forward: forward
                    })
                }
            }  
        })
    });

    return TU
}

function generateRandomCoord(mw : number, mh : number) : Coordinate{
    return {
        x : (mw - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS,
        y : (mh - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS
    }
}