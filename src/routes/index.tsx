import { createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-start";
import InputBoard from "~/components/InputBoard";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
import { TransitionUIHelper, getAllTransitionUIs } from "~/components/TransitionComponent";
import { Machine } from "~/models/machine/machine";
import { createSnapshot } from "~/models/machine/snapshot";
import { IMemoryDetais } from "~/models/memory/memory";
import State, { IStateDetails } from "~/models/states/state";
import { DIAGRAM_HEIGHT, DIAGRAM_WIDTH } from "~/styles/constants";
import Coordinate from "~/utils/Coordinate";
import { getValuesInMap } from "~/utils/dictToList";
import getMachine from "~/utils/getMachine";
import getStateLayout from "~/utils/stateLayout";

export default function Home() {

  // Layout the states
  const [machineSpec, setMachineSpec] = createSignal("")
  const [machine, setMachine] = createSignal<Machine | null>(null)

  const [states, setStates] = createSignal<IStateDetails[]>([])
  const [memory, setMemory] = createSignal<IMemoryDetais[]>([])
  const [stateCoordMap, setStateCoordMap] = createSignal(new Map<State, Coordinate>())
  const [transitionUIs, setTransitionUIs] = createSignal<TransitionUIHelper[]>([])

  const updateComponents = () => {
    if (machine() === null)
      return 

    const skeleton = createSnapshot(machine()!)

    // Update the states
    const arr : IStateDetails[]= []
    machine()!.states.forEach(element => {
      arr.push({
        name: element.name,
        accept: element.accept,
        command: element.command,
        initial: element.initial,
        isActive: element.isActive,
        loc: stateCoordMap().get(element)!
      })
    });

    setMemory(skeleton.memory)
    setStates(arr)
  }

  createEffect(() => {
      const m = getMachine(machineSpec())
      if (m !== null) {
        setMachine(m)
        const map = getStateLayout(DIAGRAM_WIDTH, DIAGRAM_HEIGHT, getValuesInMap(machine()!.states))
        setStateCoordMap(map)
        setTransitionUIs(getAllTransitionUIs(stateCoordMap()))

        updateComponents()
      }

      
  }, [machineSpec()])

  const machineObserver = (m : Machine) => {
      setMachine(m)
      updateComponents()
  } 

  return (
    <main>
      <Title>Not JFlap</Title>

      <SpecificationInput specObserver={setMachineSpec}/>
      {
        machine() &&
        <>
          <InputBoard machine={machine()!} machineObserver={machineObserver}/>
          <MachineDiagram machine={machine()!} memory={memory()} states={states()} transitions={transitionUIs()}/>
        </>
      }
    </main>
  );
}
