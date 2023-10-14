import { DELIMITER, EMPTY_STRING, IMemoryDetais, Symbol } from "~/models/memory/memory";
import "../styles/memory.css"
import { GridMap, flattenGridMap, getGridMapBounds, isOneDimensional } from "~/utils/arrayHelper";
import { createEffect, createSignal } from "solid-js";
import { MEMORY_CELLWIDTH, MEMORY_CELLHEIGHT, MEMORY_MAX_ROWS } from "~/styles/constants";
import Coordinate, { isEqual, sub } from "../utils/Coordinate";

export default function MemoryComponent(props : IMemoryDetais) {

  const [arr, setArr] = createSignal<Symbol[][]>([]) 
  const [head, setHead] = createSignal<Coordinate>({x : 0, y : 0})
  const [isRow, setIsRow] = createSignal(false)

  createEffect(() => {
    if (typeof(props.head) == "number"){
      // We're guaranteed this is 1D
      setHead({x : props.head, y : 0})
      setArr([props.contents as Symbol[]])
      setIsRow(true)
    } else {
      setArr(flattenGridMap(props.contents as GridMap<Symbol>, DELIMITER))  
      const bounds = getGridMapBounds(props.contents as GridMap<Symbol>)
      const offset : Coordinate = {
        x: bounds.tl.x ? bounds.tl.x : 0,
        y: bounds.tl.y ? bounds.tl.y : 0,
      }
      setHead(sub(props.head, offset))
      setIsRow(false)
    }  
  }, [props.contents])


  return (
      <div class="memory">
        <svg width={screen.width} height= {((isRow()) ? 1: MEMORY_MAX_ROWS) * MEMORY_CELLHEIGHT}>
          {arr().map((row, rowIndex) =>
            row.map((symbol, colIndex) =>  {
              const col = colIndex - head().x + (screen.availWidth / MEMORY_CELLWIDTH * 0.25)
              var row = rowIndex - head().y + (isRow() ? 0 : MEMORY_MAX_ROWS / 4)

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

