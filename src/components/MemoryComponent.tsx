import { Symbol } from "~/models/memory/memory";
import "../styles/memory.css"

const MEMORY_CELLWIDTH = 50
const MEMORY_CELLHEIGHT = 50
  
export default function MemoryComponent(props: { contents : Symbol[], head: number }) {
return (
    <div class="memory">
      <svg width={props.contents.length * MEMORY_CELLWIDTH} height= {MEMORY_CELLHEIGHT}>
        {props.contents.map((symbol, index) => (
          <>
            <rect
              x={index * MEMORY_CELLWIDTH}
              y="0"
              width={MEMORY_CELLWIDTH}
              height={MEMORY_CELLHEIGHT}
              class={index === props.head ? "memory-cell-current" : "memory-cell"}
            />
            <text
              x={index * MEMORY_CELLWIDTH + MEMORY_CELLWIDTH / 2}
              y={MEMORY_CELLHEIGHT / 2 + 2}
              text-anchor="middle" 
              dominant-baseline="middle"
              class="symbol"
            >
              {symbol}
            </text>
          </>
        ))}
      </svg>
    </div>
);
}