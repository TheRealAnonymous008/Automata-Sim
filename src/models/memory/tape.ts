import Memory, { Symbol } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    constructor(name : string){
        this.name = name
    }

    read  = () => {
        return "X"
    }

    write = (a: Symbol) => {
        
    }

    contents = () => {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'A', 'A', 'A', 'A']
    }

    getHead = () => {
        return 5
    }
}