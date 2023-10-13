import { Machine, setCurrentState } from "./machine";
import { isAcceptState, isRejectState } from "../states/special";
import { SimulationNode, createSnapshot, loadSnapshot } from "./snapshot";
import { evaluateNode, MachineResult } from "./derivation";

export function resetMachine(machine : Machine) {
  // Set all states as not current
  machine.states.forEach((val) => {val.isActive = false})
  setCurrentState(machine, machine.initial)
  machine.input.resetHead!()

  const contents = machine.input.contents
  machine.memory.forEach((mem) => mem.flush())
  machine.input.contents = contents
}


export default function runMachine(machine : Machine) : SimulationNode{
  const next = machine.currentState.run()
  let snapshot = createSnapshot(machine)

    next.forEach((val) => {
      setCurrentState(machine, val)
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
