import Memory from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    constructor(name : string){
        this.name = name
    }

    read  = () : string => {
        return "X"
    }

    write = (a: string) => {
        
    }
}