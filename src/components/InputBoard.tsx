import { Machine } from "~/models/machine"
import "../styles/input.css"
import { createEffect, createSignal } from "solid-js"
import step, { resetMachine } from "~/models/simulation"

export default function InputBoard(props: {machine : Machine | undefined, machineObserver: (machine : Machine) => void}){
  const [inputString, setInputString] = createSignal("")
  const [machine, setMachine] = createSignal<Machine>()

  createEffect(() => {
    if (props.machine) {
        setMachine(props.machine)
    }
  }, [props.machine])

  const handleSubmit = () => {
    machine()?.input.flush()
    let symbols = inputString().split('')
    symbols.forEach((val : string) => {
      machine()?.input.write(val)
    })

    props.machineObserver(machine()!)
    reset()
  }

  const reset = () => {
    if (machine()) {
      resetMachine(machine()!)
      props.machineObserver(machine()!)
    }
  }
  const runStep = () => {
    if (machine()) {
      step(machine()!)
      props.machineObserver(machine()!)
    }
  }

  return (
    <>
        <h2> Input String </h2>
        <div class="input-container">
          <input
              type="text"
              id="user-input"
              value={inputString()}
              onInput={(event) => {setInputString(event.target.value)}}
              class="user-input"
          />
        </div>
        
        <span>
          <button onClick={handleSubmit} class="styled-button">Submit</button>

          <div class = "input-container">
            <button class = "playboard-button styled-button" style = {``}onClick={runStep}>
              Next
            </button>

            <button class = "playboard-button styled-button" style = {``}onClick={reset}>
              Reset
            </button>
          </div>
        </span>
    </>
  )
}