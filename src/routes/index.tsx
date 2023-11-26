import { createEffect, createSignal } from "solid-js";
import { Title } from "solid-start";
import InputBoard from "~/components/InputBoard";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
import { TransitionUIHelper, getAllTransitionUIs } from "~/components/TransitionComponent";
import { Machine } from "~/models/machine/machine";
import { createSnapshot } from "~/models/machine/snapshot";
import { IMemoryDetais } from "~/models/memory/memory";
import State, { IStateDetails, getStateDetails } from "~/models/states/state";
import { DIAGRAM_HEIGHT, DIAGRAM_SCALE_CONSTANT, DIAGRAM_WIDTH, STATE_CIRCRADIUS } from "~/styles/constants";
import Coordinate from "~/utils/Coordinate";
import { getValuesInMap } from "~/utils/dictToList";
import getMachine from "~/models/machine/getMachine";
import getStateLayout from "~/utils/stateLayout";

export default function Home() {

  // Layout the states
  const [machineSpec, setMachineSpec] = createSignal("")
  const [machine, setMachine] = createSignal<Machine | null>(null)

  const [states, setStates] = createSignal<IStateDetails[]>([])
  const [memory, setMemory] = createSignal<IMemoryDetais[]>([])
  const [stateCoordMap, setStateCoordMap] = createSignal(new Map<State, Coordinate>())
  const [transitionUIs, setTransitionUIs] = createSignal<TransitionUIHelper[]>([])

  const [width, setWidth] = createSignal(DIAGRAM_WIDTH)
  const [height, setHeight] = createSignal(DIAGRAM_HEIGHT)
  
  const applyLayout = (m : Machine) => {
    const size = m.states.size * STATE_CIRCRADIUS * DIAGRAM_SCALE_CONSTANT

    setWidth(Math.max(DIAGRAM_WIDTH, size))
    setHeight(Math.max(DIAGRAM_HEIGHT, size))

    const map = getStateLayout(width(), height(), getValuesInMap(machine()!.states))
    setStateCoordMap(map)
    setTransitionUIs(getAllTransitionUIs(stateCoordMap()))
  }

  const machineSpecObserver = (spec : string) => {
    setMachineSpec(spec)
    if (machine() !== null){
      applyLayout(machine()!!)
      updateComponents()
    }
  }

  const updateComponents = () => {
    if (machine() === null)
      return 

    const skeleton = createSnapshot(machine()!)
    
    // Update the states
    const arr : IStateDetails[]= []
    machine()!.states.forEach(element => {
      arr.push(getStateDetails(element, stateCoordMap()))
    });

    setMemory(skeleton.memory)
    setStates(arr)
  }

  createEffect(() => {
      const m = getMachine(machineSpec())
      if (m !== null) {
        setMachine(m)
        applyLayout(m)
        updateComponents()
      }
  }, [machineSpec()])

  const machineObserver = (m : Machine) => {
      setMachine(m)
      updateComponents()
  } 

  return (
    <main>
      <Title>Not J-Flap</Title>

      <SpecificationInput specObserver={machineSpecObserver}/>
      {
        machine() &&
        <>
          <InputBoard machine={machine()!} machineObserver={machineObserver}/>
          <MachineDiagram 
            machine={machine()!} 
            memory={memory()} 
            states={states()} 
            transitions={transitionUIs()}
            width={width()}
            height={height()}
          />
        </>
      }
    </main>
  );
}
