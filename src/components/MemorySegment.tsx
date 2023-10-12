import { For, createEffect } from "solid-js"
import { Machine, MemoryList } from "~/models/machine"
import Memory from "~/models/memory/memory"
import { getValuesInMap } from "~/utils/dictToList"
import MemoryComponent from "./MemoryComponent"

export default function MemorySegment(props : {
    machine : Machine
}){
    return (
        <>
            <h2> Memory Segment </h2>
            <For each={getValuesInMap(props.machine.memory)} fallback={<div>No items</div>}>
                {(item : Memory, index) => 
                    <div data-index={index()}>
                        <h4> {item.name} </h4>
                        <MemoryComponent contents={item.contents} head={item.getHead()}/>
                    </div>
                }
            </For>
        </>
    )
}