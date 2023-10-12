import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine"
import getMachine from "~/utils/getMachine"
import MemorySegment from "./MemorySegment"
import StateDiagram from "./StateDiagram"

export default function MachineDiagram(props : {
    machine : Machine
}){
    return (
        <>
            <Show when={props.machine !== null}>
                <MemorySegment machine={props.machine!}/>
                <StateDiagram machine={props.machine!}/>
            </Show>
        </>
    )
}