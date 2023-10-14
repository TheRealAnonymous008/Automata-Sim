import { EMPTY_STRING, IMemoryDetais, Symbol } from "~/models/memory/memory";
import "../styles/memory.css"
import { GridMap, flattenGridMap } from "~/utils/arrayHelper";
import { createEffect, createSignal } from "solid-js";
import { MEMORY_CELLWIDTH, MEMORY_CELLHEIGHT } from "~/styles/constants";
import Coordinate, { isEqual } from "../utils/Coordinate";

export default function MemoryComponent(props : IMemoryDetais) {

  const [arr, setArr] = createSignal<Symbol[][]>([]) 
  const [head, setHead] = createSignal<Coordinate>({x : 0, y : 0})

  createEffect(() => {
    if (typeof(props.head) == "number"){
      // We're guaranteed this is 1D
      setHead({x : props.head, y : 0})
      setArr([props.contents as Symbol[]])
    } else {
      setArr(flattenGridMap(props.contents as GridMap<Symbol>, EMPTY_STRING))  
      setHead(props.head)
    }  
  }, [props.contents])


  return (
      <div class="memory">
        <svg width={screen.width} height= {Math.min(arr().length, 8) * MEMORY_CELLHEIGHT}>
          {arr().map((row, rowIndex) =>
            row.map((symbol, colIndex) =>  {
              const col = colIndex - head().x + (screen.availWidth / MEMORY_CELLWIDTH * 0.25)
              const row = rowIndex - head().y + (Math.min(arr().length, 8) - 1)
              return (
              <>
                <rect
                  x={col * MEMORY_CELLWIDTH}
                  y={row * MEMORY_CELLHEIGHT}
                  width={MEMORY_CELLWIDTH}
                  height={MEMORY_CELLHEIGHT}
                  class={isEqual(head(), {x: colIndex ,y: rowIndex})? "memory-cell-current" : "memory-cell"}
                />
                <text
                  x={col * MEMORY_CELLWIDTH + MEMORY_CELLWIDTH / 2}
                  y={row * MEMORY_CELLHEIGHT + MEMORY_CELLHEIGHT / 2 + 2}
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  class="symbol"
                >
                  {symbol}
                </text>
              </>
            )})
          )}
        </svg>
      </div>
  );
}

