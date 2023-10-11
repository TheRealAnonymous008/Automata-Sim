import { Machine } from "~/models/machine";
import StateComponent from "./StateComponent";
import { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "~/models/states/dummy";
import State from "~/models/states/state";
import { For } from "solid-js";
import MemoryComponent from "./Memory";
import { getValuesInDict } from "~/utils/dictToList";

export default function StateDiagram(props :{
    machine : Machine
}){
    return (
        <>
            <h2> State Diagram </h2>
            <For each={getValuesInDict(props.machine.states)} fallback={<div>No items</div>}>
                {(item : State, index) => 
                    <div data-index={index()}>
                        <StateComponent state={item}/>
                    </div>
                }
            </For>

        </>
    )
}   