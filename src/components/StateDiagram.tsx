import { Machine } from "~/models/machine/machine";
import StateComponent from "./StateComponent";
import State, { IStateDetails } from "~/models/states/state";
import { For, createEffect, createSignal } from "solid-js";
import { getKeysInMap, getValuesInMap } from "~/utils/dictToList";
import TransitionComponent, { TransitionUIHelper, getAllTransitionUIs } from "./TransitionComponent";
import Coordinate from "../utils/Coordinate";
import getStateLayout from "~/utils/stateLayout";
import { DIAGRAM_HEIGHT, DIAGRAM_WIDTH, STATE_CIRCRADIUS } from "~/styles/constants";

export default function StateDiagram(props :{
    machine : Machine,
    transitions: TransitionUIHelper[]
    states: IStateDetails[],
    highlightND: boolean,
    width: number,
    height: number 
}){
    return (
        <>
            <h2> State Diagram </h2>
            <svg width={props.width} height={props.height}>
                {/* Plot transitions. Plot them first so that they are at the bottom */}
                <For each={props.transitions}>
                    {
                        (item : TransitionUIHelper, index) => {
                            return <TransitionComponent 
                                src={item.sourceloc}
                                dest={item.destloc}
                                forward={item.forward}
                                backward={item.backward}
                                idx={index()}
                            />
                        }
                    }
                </For>

                {/* Plot states */}
                <For each={props.states}>
                    {(item : IStateDetails, index) => 
                        <StateComponent 
                            details= {item}
                            highlight={props.highlightND}
                        />
                    }
                </For>  
            </svg>
        </>
    )
}   