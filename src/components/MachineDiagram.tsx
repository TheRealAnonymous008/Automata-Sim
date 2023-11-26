import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine/machine"
import getMachine from "~/models/machine/getMachine"
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
    transitions: TransitionUIHelper[],
    width: number,
    height: number
}){
    const [memory, setMemory] = createSignal(props.memory)
    const [highlightND, setHighlightND] = createSignal(false)

    createEffect(() => {
        setMemory(props.memory)
    }, [props.memory])

    const highlight = () => {
        setHighlightND(!highlightND())
    }

    return (
        <>
            <Show when={props.machine !== null}>
                <MemorySegment memory={memory()}/>
                <StateDiagram 
                    machine={props.machine!}
                    states={props.states}
                    transitions={props.transitions}
                    highlightND={highlightND()}
                    width={props.width}
                    height={props.height}
                />

            <div class = "input-container">
                <button class = "playboard-button styled-button" style = {``}onClick={highlight}>
                Highlight non-determinism
                </button>
            </div>
            </Show>
        </>
    )
}