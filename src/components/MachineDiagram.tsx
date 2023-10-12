import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine"
import getMachine from "~/utils/getMachine"
import MemorySegment from "./MemorySegment"
import StateDiagram from "./StateDiagram"

export default function MachineDiagram(props : {
    machineSpec : string,
    machineObserver? : (machine : Machine|null) => {}
}){
    const [machine, setMachine] = createSignal<Machine|null>(null)

    createEffect(() => {
        setMachine(getMachine(props.machineSpec))
        if (props.machineObserver) {
            props.machineObserver(machine())
        }
    }, [props.machineSpec])

    return (
        <>
            <Show when={machine() !== null}>
                <MemorySegment machine={machine()!}/>
                <StateDiagram machine={machine()!}/>
            </Show>
        </>
    )
}