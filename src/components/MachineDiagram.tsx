import { createEffect, createSignal } from "solid-js"
import getMachine from "~/utils/getMachine"

export default function MachineDiagram(props : {
    machineSpec : string
}){
    createEffect(() => {
        console.log(props.machineSpec)
        console.log(getMachine(props.machineSpec))
    }, [props.machineSpec])

    return (
        <>
            <h2> Machine </h2>
        </>
    )
}