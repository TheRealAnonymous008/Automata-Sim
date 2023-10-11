import { Show, Switch, createEffect, createSignal } from "solid-js"
import { Machine } from "~/models/machine"
import getMachine from "~/utils/getMachine"
import MemorySegment from "./MemorySegment"

export default function MachineDiagram(props : {
    machineSpec : string
}){
    const [machine, setMachine] = createSignal<Machine|null>(null)

    createEffect(() => {
        setMachine(getMachine(props.machineSpec))
        console.log(machine())
    }, [props.machineSpec])

    return (
        <>
            <h2> Machine </h2>
            <Show when={machine() != null}>
                <MemorySegment memory={machine()?.memory!}/>
            </Show>
        </>
    )
}