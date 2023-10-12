import Coordinate from "~/utils/Coordinate";

export type Symbol = string | null
export const DELIMITER = "#"

export default interface Memory {
    name : string,
    read: () => Symbol,
    write: (a : Symbol) => void,
    contents : () => Symbol[] | Symbol[][],
    getHead : () => number | Coordinate,
    updated : boolean,
}