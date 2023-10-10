import { createSignal } from "solid-js";
import "~/styles/machinespec.css"
  

export default function SpecificationInput(props : {
    specObserver : (str: string) => {}
}) {
    const [machineSpec, setMachineSpec] = createSignal("");

    const handleSubmit = () => {
        props.specObserver(machineSpec())
    }

    return (
        <>
            <h2 > Specification </h2>
            <textarea
                rows = "15"
                cols = "100"
                value={machineSpec()} 
                onInput={event => {setMachineSpec(event.target.value)}}
                class="styled-textarea"
            />
            
            <button onClick={handleSubmit} class="submit-button">Submit</button>
        </>
    )
}