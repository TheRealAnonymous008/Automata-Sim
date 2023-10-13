import { Machine } from "~/models/machine/machine"
import "../styles/input.css"
import { createEffect, createSignal } from "solid-js"
import { isAcceptState, isRejectState } from "~/models/states/special"
import { DELIMITER } from "~/models/memory/memory"
import { MachineResult, getShortestDerivation } from "~/models/machine/derivation"
import runMachine, { resetMachine } from "~/models/machine/simulation"
import { SimulationNode, loadSnapshot } from "~/models/machine/snapshot"

export default function InputBoard(props: {machine : Machine | undefined, machineObserver: (machine : Machine) => void}){
  const [inputString, setInputString] = createSignal("")
  const [machine, setMachine] = createSignal<Machine>()
  const [verdict, setVerdict] = createSignal<MachineResult>(MachineResult.CONTINUE)
  const [simTree, setSimTree] = createSignal<SimulationNode>()
  const [simCurrent, setSimCurrent] = createSignal<SimulationNode>()

  createEffect(() => {
    if (props.machine) {
        setMachine(props.machine)
    }
  }, [props.machine])

  const handleSubmit = () => {
    machine()?.input.flush()
    let symbols = (DELIMITER +  inputString() + DELIMITER).split('')
    symbols.forEach((val : string) => {
      machine()?.input.write(val)
    })

    props.machineObserver(machine()!)
    reset()

    // Run the sim tree
    const completeSimTree = runMachine(machine()!)
    setSimTree(getShortestDerivation(completeSimTree))
    setSimCurrent(simTree())

    const verdict = simTree()?.accept
    setVerdict(verdict ? MachineResult.ACCEPT : MachineResult.REJECT)
    props.machineObserver(machine()!)
  }

  const reset = () => {
    if (machine()) {
      resetMachine(machine()!)
      props.machineObserver(machine()!)
      setSimCurrent(simTree())
    }
  }
  const runStep = () => {
    if (simTree()) {
      var candidate = null 
      if (simCurrent()!.next.length != 0){
        candidate = simCurrent()!.next[0]
      } else {
        candidate = simCurrent()
      }

      setSimCurrent(candidate)
      loadSnapshot(machine()!, simCurrent()!)
      
      props.machineObserver(machine()!)
    }
  }

  const getVerdictStyle = () => {
    switch(verdict()){
      case MachineResult.ACCEPT: return "accept"
      case MachineResult.REJECT: return "reject"
      case MachineResult.CONTINUE: return ""
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
              class={"user-input " + getVerdictStyle()}
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