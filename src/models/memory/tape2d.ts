import Coordinate from "~/utils/Coordinate"
import Memory, { Symbol } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape2D implements Memory{
    readonly name : string
    head: Coordinate = {x: 0, y: 0}
    contents = [['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H', 'I', 'A', 'A', 'A', 'A']]

    constructor(name : string){
        this.name = name
    }

    flush = () => {
        this.contents = [['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H', 'I', 'A', 'A', 'A', 'A']]
    }


    read  = () => {
        return "X"
    }

    write = (a: Symbol) => {
        
    }

    left = () => {
        this.head.x--
    }

    right = () => {
        this.head.x++
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
}