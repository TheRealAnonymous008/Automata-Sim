import Coordinate from "~/utils/Coordinate";

export type Symbol = string | null
export const DELIMITER = "#"


export interface IMemoryDetais { name: string, contents : Symbol[] | Symbol[][], head: number | Coordinate }

export default interface Memory {
    name : string,
    read: () => Symbol,
    write: (a : Symbol) => void,
    flush: () => void
    contents : Symbol[] | Symbol[][],
    getHead : () => number | Coordinate
}