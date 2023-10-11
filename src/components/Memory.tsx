import { Symbol } from "~/models/memory/memory";
import "../styles/tape.css"

function TapeCell(props : { symbol : Symbol, isCurrent : boolean}) {
    return (
      <div class={`tape-cell ${props.isCurrent ? "current" : ""}`}>
        {props.symbol !== null ? props.symbol : " "}
      </div>
    );
  }
  
export default function Tape(props: { contents : Symbol[], head: number }) {
return (
    <div class="tape">
    {props.contents.map((symbol, index) => (
        <TapeCell
            symbol={symbol}
            isCurrent={index === props.head}
        />
    ))}
    </div>
);
}