import { Symbol } from "~/models/memory/memory";
import "../styles/memory.css"

function MemoryCell(props : { symbol : Symbol, isCurrent : boolean}) {
    return (
      <div class={`memory-cell ${props.isCurrent ? "current" : ""}`}>
        {props.symbol !== null ? props.symbol : " "}
      </div>
    );
  }
  
export default function MemoryComponent(props: { contents : Symbol[], head: number }) {
return (
    <div class="memory">
    {props.contents.map((symbol, index) => (
        <MemoryCell
            symbol={symbol}
            isCurrent={index === props.head}
        />
    ))}
    </div>
);
}