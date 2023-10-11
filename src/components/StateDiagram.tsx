import { Machine } from "~/models/machine";
import StateComponent from "./StateComponent";
import State from "~/models/states/state";
import { For, Ref } from "solid-js";
import { getValuesInDict } from "~/utils/dictToList";
import { Symbol } from "~/models/memory/memory";
import TransitionComponent from "./TransitionComponent";

export default function StateDiagram(props :{
    machine : Machine
}){
    let cw = 1000
    let ch = 1000

    let refs = []
    return (
        <>
            <h2> State Diagram </h2>
            <svg width={ch} height={ch}>
                <For each={getValuesInDict(props.machine.states)} fallback={<div>No items</div>}>
                    {(item : State, index) => 
                        <StateComponent 
                            state={item} 
                            loc = {{
                                x : (cw - 50) * Math.random(),
                                y : (ch - 50) * Math.random()
                            }}
                        />
                    }
                </For>  

                <TransitionComponent
                    src={{x : 300, y : 300}}
                    dest={{x : 400, y : 150}}
                />
            </svg>
        </>
    )
}   

type TransitionUIHelper = {
    symbols : Symbol[],
    source : State,
    dest: State
}