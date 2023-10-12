import { createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-start";
import InputBoard from "~/components/InputBoard";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
import { Machine } from "~/models/machine";
import { IMemoryDetais } from "~/models/memory/memory";
import { createSnapshot } from "~/models/simulation";
import { getValuesInMap } from "~/utils/dictToList";
import getMachine from "~/utils/getMachine";

export default function Home() {

  const [machineSpec, setMachineSpec] = createSignal("")
  const [machine, setMachine] = createSignal<Machine | null>(null)
  const [states, setStates] = createSignal([])
  const [memory, setMemory] = createSignal<IMemoryDetais[]>([])

  const updateComponents = () => {
    if (machine() === null)
      return 

    const skeleton = createSnapshot(machine()!)
    setMemory(skeleton.memory) 
  }

  createEffect(() => {
      const m = getMachine(machineSpec())
      if (m !== null) {
        setMachine(m)
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
          <MachineDiagram machine={machine()!} memory={memory()}/>
        </>
      }
    </main>
  );
}
