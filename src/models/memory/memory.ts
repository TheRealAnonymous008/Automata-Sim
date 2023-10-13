import Coordinate from "~/utils/Coordinate";
import { Machine } from "../machine/machine";

export type Symbol = string | null
export const DELIMITER = "#"


export interface IMemoryDetais { 
    key?: string,
    name: string, 
    contents : Symbol[] | Symbol[][], 
    head: number | Coordinate 
}

export default interface Memory {
    key: string
    name : string,
    head : number | Coordinate,
    read: () => Symbol,
    write: (a : Symbol) => void,
    flush: () => void
    contents : Symbol[] | Symbol[][],
    resetHead?: () => void 
}

export function getDetails(memory : Memory) : IMemoryDetais{
    return {
        contents: memory.contents,
        head: memory.head,
        key: memory.key, 
        name: memory.name
    }
}

export function loadToMachine(machine: Machine, payload: IMemoryDetais) {
    const memory = machine.memory.get(payload.key!)

    if (memory){
        memory.contents = payload.contents
        memory.head = payload.head
    }
}

export function loadToMemory(memory : Memory, payload: IMemoryDetais) {
    if (memory){
        memory.contents = payload.contents
        memory.head = payload.head
    }
}