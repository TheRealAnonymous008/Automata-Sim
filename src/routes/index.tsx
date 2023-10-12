import { createEffect, createSignal, useContext } from "solid-js";
import { Title } from "solid-start";
import InputBoard from "~/components/InputBoard";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
import { Machine } from "~/models/machine";

export default function Home() {

  const [machineSpec, setMachineSpec] = createSignal("")
  const [machine, setMachine] = createSignal<Machine>()

  return (
    <main>
      <Title>Not JFlap</Title>

      <SpecificationInput specObserver={setMachineSpec}/>
      <InputBoard machine={machine()}/>
      <MachineDiagram machineSpec={machineSpec()} machineObserver={setMachine}/>

    </main>
  );
}
