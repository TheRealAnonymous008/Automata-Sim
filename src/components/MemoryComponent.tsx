import { Symbol } from "~/models/memory/memory";
import "../styles/memory.css"
import { getMaxLength, isOneDimensional } from "~/utils/arrayHelper";
import { For, createEffect } from "solid-js";
import { MEMORY_CELLWIDTH, MEMORY_CELLHEIGHT } from "~/styles/constants";
import Coordinate, { isEqual } from "../utils/Coordinate";

  
export default function MemoryComponent(props: { contents : Symbol[] | Symbol[][], head: number | Coordinate }) {

  let arr : Symbol[][] = []
  let head : Coordinate = {x : 0, y: 0}

  createEffect(() => {
    console.log("Goodbye")
  }, [props.contents])

  if (isOneDimensional(props.contents)){
    arr = [props.contents as Symbol[]]
  } else {
    arr = props.contents as Symbol[][]
  }

  if (typeof(props.head) == "number"){
    head.x = props.head
    head.y = 0
  } else {
    head = props.head
  }

  return (
      <div class="memory">
        <svg width={getMaxLength(arr) * MEMORY_CELLWIDTH} height= {arr.length * MEMORY_CELLHEIGHT}>
          {arr.map((row, rowIndex) =>
            row.map((symbol, colIndex) => (
              <>
                <rect
                  x={colIndex * MEMORY_CELLWIDTH}
                  y={rowIndex * MEMORY_CELLHEIGHT}
                  width={MEMORY_CELLWIDTH}
                  height={MEMORY_CELLHEIGHT}
                  class={isEqual(head, {x: colIndex ,y: rowIndex})? "memory-cell-current" : "memory-cell"}
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

