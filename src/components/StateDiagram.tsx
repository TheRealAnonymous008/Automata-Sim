import { Machine } from "~/models/machine";
import StateComponent, { STATE_CIRCRADIUS } from "./StateComponent";
import State, { getAllTransitions } from "~/models/states/state";
import { For, Ref, createEffect, createSignal } from "solid-js";
import { getKeysInMap, getValuesInMap } from "~/utils/dictToList";
import { Symbol } from "~/models/memory/memory";
import TransitionComponent, { TransitionUIHelper, getAllTransitionUIs } from "./TransitionComponent";
import Coordinate from "./Coordinate";

export default function StateDiagram(props :{
    machine : Machine
}){
    let cw = 1000
    let ch = 1000

    // Layout the states
    const [stateCoordMap, setStateCoordMap] = createSignal(new Map<State, Coordinate>())
    const [transitionUIs, setTransitionUIs] = createSignal<TransitionUIHelper[]>([])

    createEffect(() => {
        const map = new Map<State, Coordinate>()
        getValuesInMap(props.machine.states).forEach((val, idx) => {
            map.set(val, generateRandomCoord(cw, ch))
        })
        setStateCoordMap(map)

        setTransitionUIs(getAllTransitionUIs(props.machine))
    }, [props.machine])

    return (
        <>
            <h2> State Diagram </h2>
            <svg width={ch} height={ch}>
                {/* Plot transitions. Plot them first so that they are at the bottom */}
                <For each={transitionUIs()}>
                    {
                        (item : TransitionUIHelper) => {
                            return <TransitionComponent 
                                src={stateCoordMap().get(item.source)!}
                                dest={stateCoordMap().get(item.dest)!}
                                forward={item.forward}
                                backward={item.backward}
                            />
                        }
                    }
                </For>

                {/* Plot states */}
                <For each={getKeysInMap(stateCoordMap())}>
                    {(item : State, index) => 
                        <StateComponent 
                            state={item} 
                            loc = {stateCoordMap().get(item)!}
                        />
                    }
                </For>  
            </svg>
        </>
    )
}   

type StateCoordMap = Map<State, Coordinate>

function generateRandomCoord(mw : number, mh : number) : Coordinate{
    return {
        x : (mw - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS,
        y : (mh - 2 * STATE_CIRCRADIUS) * Math.random() + STATE_CIRCRADIUS
    }
}