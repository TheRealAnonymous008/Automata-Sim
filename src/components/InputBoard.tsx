import { Machine } from "~/models/machine"
import "../styles/input.css"
import { createEffect, createSignal } from "solid-js"

export default function InputBoard(props: {machine : Machine | undefined, machineObserver: (machine : Machine) => void}){
  const [inputString, setInputString] = createSignal("")
  const [machine, setMachine] = createSignal<Machine>()

  createEffect(() => {
    if (props.machine) {
        setMachine(props.machine)
    }
  }, [props.machine])

  createEffect(() => {
    if (machine()){
        let symbols = inputString().split('')
        symbols.forEach((val : string) => {
            machine()?.input.write(val)
        })
    }
  }, [inputString()])

  const handleSubmit = () => {
    props.machineObserver(machine()!)
  }

  return (
    <>
        <h2> Input String </h2>
        <input
            type="text"
            id="user-input"
            value={inputString()}
            onInput={(event) => {setInputString(event.target.value)}}
            class="user-input"
        />

        
        <button onClick={handleSubmit} class="submit-button">Submit</button>
    </>
  )
}