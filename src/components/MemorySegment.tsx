import { For } from "solid-js"
import { MemoryList } from "~/models/machine"
import Memory from "~/models/memory/memory"
import { getValuesInDict } from "~/utils/dictToList"

export default function MemorySegment(props : {
    memory : MemoryList
}){
    return (
        <>
            <h3> Memory Segment </h3>
            <For each={getValuesInDict(props.memory)} fallback={<div>No items</div>}>
                {(item : Memory, index) => 
                    <div data-index={index()}>
                        <h4> {item.name} </h4>
                    </div>
                }
            </For>
        </>
    )
}