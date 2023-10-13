import Coordinate from "~/utils/Coordinate"
import Memory, { EMPTY_STRING, Symbol } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape2D implements Memory{
    readonly name : string
    head: Coordinate = {x: 0, y: 0}
    key: string = ""
    contents = new  Map<number, Map<number, Symbol>>()

    constructor(name : string, key: string = name){
        this.name = name
        this.key = key
    }

    flush = () => {
        this.contents.clear()
    }


    read  = () => {
        return ""
    }

    write = (a: Symbol) => {
        
    }

    left = () => {
        this.head.x--
    }

    right = () => {
        this.head.x++
    }

    up = () => {
        this.head.y--
    }

    down = () => {
        this.head.y ++ 
    }

    getHead = () => {
        // Note: y = row, x = col
        return {
            x: 2,
            y: 1
        }
    }
    
    resetHead = () => {
        return {
            x: 0,
            y :0
        }
    }

    replace = (a: Symbol) : Symbol=> {
        return EMPTY_STRING
    }

}