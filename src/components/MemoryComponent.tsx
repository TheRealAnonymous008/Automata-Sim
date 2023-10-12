import { Symbol } from "~/models/memory/memory";
import "../styles/memory.css"
import { getMaxLength, isOneDimensional } from "~/utils/arrayHelper";
import { For, createEffect, createSignal } from "solid-js";
import { MEMORY_CELLWIDTH, MEMORY_CELLHEIGHT } from "~/styles/constants";
import Coordinate, { isEqual } from "../utils/Coordinate";

interface IMemoryComponent { contents : Symbol[] | Symbol[][], head: number | Coordinate }

export default function MemoryComponent(props : IMemoryComponent) {

  const [arr, setArr] = createSignal<Symbol[][]>([]) 
  const [head, setHead] = createSignal<Coordinate>({x : 0, y : 0})

  createEffect(() => {
    if (isOneDimensional(props.contents)){
      setArr([props.contents as Symbol[]])
    } else {
      setArr(props.contents as Symbol[][])
    }
  
    if (typeof(props.head) == "number"){
      setHead({x : props.head, y : 0})
    } else {
      setHead(props.head)
    }  
  }, [props.contents])


  return (
      <div class="memory">
        <svg width={getMaxLength(arr()) * MEMORY_CELLWIDTH} height= {arr.length * MEMORY_CELLHEIGHT}>
          {arr().map((row, rowIndex) =>
            row.map((symbol, colIndex) => (
              <>
                <rect
                  x={colIndex * MEMORY_CELLWIDTH}
                  y={rowIndex * MEMORY_CELLHEIGHT}
                  width={MEMORY_CELLWIDTH}
                  height={MEMORY_CELLHEIGHT}
                  class={isEqual(head(), {x: colIndex ,y: rowIndex})? "memory-cell-current" : "memory-cell"}
                />
                <text
                  x={colIndex * MEMORY_CELLWIDTH + MEMORY_CELLWIDTH / 2}
                  y={rowIndex * MEMORY_CELLHEIGHT + MEMORY_CELLHEIGHT / 2 + 2}
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  class="symbol"
                >
                  {symbol}
                </text>
              </>
            ))
          )}
        </svg>
      </div>
  );
}

