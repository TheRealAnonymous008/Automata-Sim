import { createSignal } from "solid-js";
import { Title } from "solid-start";
import MachineDiagram from "~/components/MachineDiagram";

export default function Home() {
  const [machineSpec, setMachineSpec] = createSignal("");

  return (
    <main>
      <Title>Not JFLAP</Title>

      <h2 > Specification </h2>
      <textarea
        rows = "30"
        cols = "100"
        value={machineSpec()} 
        onInput={event => setMachineSpec(event.target.value)}
      />
      <h2> Machine </h2>
      
      <MachineDiagram/>

      <h2> Input String </h2>

    </main>
  );
}
