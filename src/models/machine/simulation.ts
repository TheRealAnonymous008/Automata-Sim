import { Machine, setCurrentState } from "./machine";
import { SimulationNode, createSnapshot, loadSnapshot } from "./snapshot";
import { evaluateNode, MachineResult } from "./derivation";
import { loadToMachine } from "../memory/memory";

export function resetMachine(machine : Machine) {
  // Set all states as not current
  machine.states.forEach((val) => {val.isActive = false})
  setCurrentState(machine, machine.initial)
  machine.input.resetHead!()

  const contents = structuredClone(machine.input.contents)

  machine.memory.forEach((mem) => mem.flush())
  machine.input.contents = contents
}


export default function runMachine(machine : Machine) : SimulationNode{
    let snapshot = createSnapshot(machine)
    const next = machine.currentState.run()

    next.forEach((val) => {
      setCurrentState(machine, val.state)
      loadToMachine(machine, val.memory)
      
      let child = runMachine(machine)
      child.parent = snapshot
      child.depth = child.parent.depth + 1
      snapshot.next.push(child)

      snapshot.accept = snapshot.accept || child.accept
      loadSnapshot(machine, snapshot)
    })

    var evaluation = evaluateNode(snapshot)
    if (next.length === 0 && evaluation == MachineResult.ACCEPT){
      snapshot.accept = true
    }

    return snapshot
}
