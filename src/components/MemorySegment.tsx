import { For, createEffect } from "solid-js"
import { Machine, MemoryList } from "~/models/machine"
import Memory from "~/models/memory/memory"
import { getValuesInMap } from "~/utils/dictToList"
import MemoryComponent, { IMemoryComponent } from "./MemoryComponent"
import { createSignal } from "solid-js"

export default function MemorySegment(props : {
    memory : IMemoryComponent[]
}){
    const [memory, setMemory] = createSignal(props.memory)

    createEffect(() => {
        setMemory(props.memory)
    }, [props.memory])

    return (
        <>
            <h2> Memory Segment </h2>
            <For each={memory()} fallback={<div>No items</div>}>
                {(item : IMemoryComponent, index) => 
                    <div data-index={index()}>
                        <h4> {item.name} </h4>
                        <MemoryComponent name = {item.name} contents={item.contents} head={item.head}/>
                    </div>
                }
            </For>
        </>
    )
}