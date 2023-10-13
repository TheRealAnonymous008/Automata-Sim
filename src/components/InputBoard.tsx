import { Machine } from "~/models/machine"
import "../styles/input.css"
import { createEffect, createSignal } from "solid-js"
import runMachine, { MachineResult, SimulationNode, createSnapshot, evaluateNode, evaluateTree, loadSnapshot, resetMachine } from "~/models/simulation"
import { isAcceptState, isRejectState } from "~/models/states/special"

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
    let symbols = inputString().split('')
    symbols.forEach((val : string) => {
      machine()?.input.write(val)
    })

    props.machineObserver(machine()!)
    reset()

    setSimTree(runMachine(machine()!))
    setSimCurrent(simTree())
    setVerdict(evaluateTree(simTree()!))
    props.machineObserver(machine()!)
  }

  const reset = () => {
    if (machine()) {
      resetMachine(machine()!)
      props.machineObserver(machine()!)
    }
  }
  const runStep = () => {
    if (simTree()) {
      var candidate = null
      for(let n of simCurrent()!.next){
        if (n.path == true) {
          candidate = n
          break
        }
      }
      
      if (candidate == null && simCurrent()!.next.length != 0) {
        candidate = simCurrent()!.next[0]
      }

      if (candidate !== null){
        setSimCurrent(candidate)
        loadSnapshot(machine()!, simCurrent()!)
      }
        // Check if it is the last input string in the case of special states
      if (isAcceptState(machine()!.currentState) || isRejectState(machine()!.currentState)){
        machine()!.currentState.run()
        setSimCurrent(createSnapshot(machine()!))
      }
      
      props.machineObserver(machine()!)
    }
  }

  const getVerdictStyle = () => {
    switch(verdict()){
      case MachineResult.ACCEPT: return "accept"
      case MachineResult.REJECT: return "reject"
      case MachineResult.CONTINUE: return ""
      case MachineResult.SOFT_ACCEPT: return "soft-accept"
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