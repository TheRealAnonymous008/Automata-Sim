import { createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-start";
import InputBoard from "~/components/InputBoard";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
import { Machine } from "~/models/machine";
import Memory from "~/models/memory/memory";
import Tape from "~/models/memory/tape";
import State from "~/models/states/state";
import deepCopyMachine from "~/utils/deepCopyMachine";
import getMachine from "~/utils/getMachine";

export default function Home() {

  const [machineSpec, setMachineSpec] = createSignal("")
  const [machine, setMachine] = createStore<Machine>({
    input: new Tape("input"), 
    memory: new Map<string, Memory>(),
    states: new Map<string, State>()
  })

  createEffect(() => {
      const m = getMachine(machineSpec())
      if (m !== null) {
        setMachine(m)
      }
  }, [machineSpec()])

  const machineObserver = (m : Machine) => {
      setMachine(m)
  } 

  return (
    <main>
      <Title>NotJFlap</Title>

      <SpecificationInput specObserver={setMachineSpec}/>
      {
        machine !== undefined &&
        <>
          <InputBoard machine={machine} machineObserver={machineObserver}/>
          <MachineDiagram machine={machine}/>
        </>
      }
    </main>
  );
}
