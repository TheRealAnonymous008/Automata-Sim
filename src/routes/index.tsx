import { createEffect, createSignal, useContext } from "solid-js";
import { Title } from "solid-start";
import MachineDiagram from "~/components/MachineDiagram";
import SpecificationInput from "~/components/SpecificationInput";
export default function Home() {

  const [machineSpec, setMachineSpec] = createSignal("")

  return (
    <main>
      <Title>Not JFLAP</Title>

      <SpecificationInput specObserver={setMachineSpec}/>
      <MachineDiagram machineSpec={machineSpec()}/>
      <h2> Input String </h2>

    </main>
  );
}
