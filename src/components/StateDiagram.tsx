import { Machine } from "~/models/machine";
import StateComponent from "./StateComponent";
import State from "~/models/states/state";
import { For } from "solid-js";
import { getValuesInDict } from "~/utils/dictToList";

export default function StateDiagram(props :{
    machine : Machine
}){
    let cw = 1000
    let ch = 1000
    return (
        <>
            <h2> State Diagram </h2>
            <div style={`width: ${cw}px; height: ${ch}px; position: relative`}>
                <For each={getValuesInDict(props.machine.states)} fallback={<div>No items</div>}>
                    {(item : State, index) => 
                        <StateComponent state={item} x={(cw - 100) * Math.random()} y={(ch - 100) * Math.random()}/>
                    }
                </For>
            </div>
        </>
    )
}   