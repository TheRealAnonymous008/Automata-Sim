import Coordinate from "~/utils/Coordinate";
import { Machine } from "../machine/machine";
import { GridMap } from "~/utils/arrayHelper";

export type Symbol = string | null
export const DELIMITER = "#"
export const EMPTY_STRING = ""


export interface IMemoryDetais { 
    key?: string,
    name: string, 
    contents : MemoryContentsType, 
    head: number | Coordinate 
}

export type MemoryContentsType = Symbol[] | GridMap<Symbol>

export default interface Memory {
    key: string
    name : string,
    head : number | Coordinate,
    inputAlphabet : Set<Symbol>,
    outputAlphabet: Set<Symbol>,
    read: () => Symbol,
    write: (a : Symbol) => void,
    flush: () => void
    contents : MemoryContentsType,
    resetHead?: () => void 
}

export function getDetails(memory : Memory) : IMemoryDetais{
    var contents : MemoryContentsType = structuredClone(memory.contents)
    var head = structuredClone(memory.head)
    return {
        contents: contents,
        head: head,
        key: memory.key, 
        name: memory.name
    }
}

export function loadToMachine(machine: Machine, payload: IMemoryDetais) {
    const memory = machine.memory.get(payload.key!)
    loadToMemory(memory, payload)
}

export function loadToMemory(memory : Memory|undefined, payload: IMemoryDetais) {
    if (memory){
        const contents : any[] = []
        payload.contents.forEach((v) => {
            contents.push(v)
        })
        memory.contents = payload.contents
        memory.head = payload.head
    }
}