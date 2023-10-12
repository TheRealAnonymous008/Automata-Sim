import Memory, { Symbol } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape2D implements Memory{
    readonly name : string
    contents = [['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H', 'I', 'A', 'A', 'A', 'A']]

    constructor(name : string){
        this.name = name
    }

    read  = () => {
        return "X"
    }

    write = (a: Symbol) => {
        
    }

    getHead = () => {
        // Note: y = row, x = col
        return {
            x: 2,
            y: 1
        }
    }
}