import Coordinate, { NullableCoordinate, isNull, sub } from "./Coordinate";
import { getKeysInMap } from "./dictToList";

export function isOneDimensional(arr : any[]){
    return arr.every(entry => !Array.isArray(entry))
}

export function getMaxLength(arr: any[][]){
    let m = 0
    arr.forEach(element => {
        m = Math.max(element.length, m)
    });

    return m
}

export type GridMap<T> = Map<number, Map<number, T>>

export function flattenGridMap<T>(grid : GridMap<T>, defaultItem: T) : T[][]{
    const arr : T[][] = []

    const bounds = getGridMapBounds(grid)
    if (isNull(bounds.br) || isNull(bounds.tl)){
        return [[]]
    }

    // First create the grid
    for(let i = bounds.tl.y! ; i <= bounds.br.y!; ++i){
        const row : T[] = []
        for (let j = bounds.tl.x!; j <= bounds.br.x!; ++j){
            row.push(defaultItem)
        }
        arr.push(row)
    }

    // Then map each element on the grid
    grid.forEach((row, r) => {
        row.forEach((x, c) => {
            arr[r][c] = x
        })
    })

    return arr
}

export function getGridMapBounds<T>(grid : GridMap<T>) : {
    tl: NullableCoordinate,
    br: NullableCoordinate
} {
    let tl: NullableCoordinate = {x: null, y: null}
    let br: NullableCoordinate = {x: null, y: null}

    grid.forEach((row, ycor) => {
        row.forEach((_, xcor) => {
            if (tl.x === null){
                tl = {x: xcor, y: ycor}
            } 
            if (br.x === null){
                br = {x: xcor, y: ycor}
            }

            tl.x = Math.min(tl.x!, xcor)
            br.x = Math.max(br.x!, xcor)
        })

        if (tl.y === null){
            tl = {x: null, y: ycor}
        } 
        if (br.y === null){
            br = {x: null, y: ycor}
        }

        tl.y = Math.min(tl.y!, ycor)
        br.y = Math.max(br.y!, ycor)
    })

    return {
        tl: tl!,
        br: br!
    }
}