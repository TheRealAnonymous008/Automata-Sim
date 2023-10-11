import { For } from "solid-js"
import { MemoryList } from "~/models/machine"
import Memory from "~/models/memory/memory"
import { getValuesInDict } from "~/utils/dictToList"
import Tape from "./Memory"

export default function MemorySegment(props : {
    memory : MemoryList
}){
    return (
        <>
            <h2> Memory Segment </h2>
            <For each={getValuesInDict(props.memory)} fallback={<div>No items</div>}>
                {(item : Memory, index) => 
                    <div data-index={index()}>
                        <h4> {item.name} </h4>
                        <Tape contents={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'A', 'A', 'A', 'A']} head={1}></Tape>
                    </div>
                }
            </For>
        </>
    )
}