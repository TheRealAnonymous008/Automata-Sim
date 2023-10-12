import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine"
import getMachine from "~/utils/getMachine"
import MemorySegment from "./MemorySegment"
import StateDiagram from "./StateDiagram"
import { getValuesInMap } from "~/utils/dictToList"
import Memory, { IMemoryDetais } from "~/models/memory/memory"

export default function MachineDiagram(props : {
    machine : Machine,
    memory : IMemoryDetais[]
}){
    const [memory, setMemory] = createSignal(props.memory)

    createEffect(() => {
        setMemory(props.memory)
    }, [props.memory])

    return (
        <>
            <Show when={props.machine !== null}>
                <MemorySegment memory={memory()}/>
                <StateDiagram machine={props.machine!}/>
            </Show>
        </>
    )
}