import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine/machine"
import getMachine from "~/utils/getMachine"
import MemorySegment from "./MemorySegment"
import StateDiagram from "./StateDiagram"
import { getValuesInMap } from "~/utils/dictToList"
import Memory, { IMemoryDetais } from "~/models/memory/memory"
import State, { IStateDetails } from "~/models/states/state"
import { TransitionUIHelper } from "./TransitionComponent"

export default function MachineDiagram(props : {
    machine : Machine,
    memory : IMemoryDetais[],
    states: IStateDetails[],
    transitions: TransitionUIHelper[]
}){
    const [memory, setMemory] = createSignal(props.memory)

    createEffect(() => {
        setMemory(props.memory)
    }, [props.memory])

    return (
        <>
            <Show when={props.machine !== null}>
                <MemorySegment memory={memory()}/>
                <StateDiagram 
                    machine={props.machine!}
                    states={props.states}
                    transitions={props.transitions}
                />
            </Show>
        </>
    )
}