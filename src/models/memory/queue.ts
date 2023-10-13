import Coordinate from "~/utils/Coordinate"
import Memory, { Symbol } from "./memory"

export default class Queue implements Memory{
    readonly name : string
    readonly head = 0
    contents = []

    constructor(name : string){
        this.name = name
    }

    flush = () => {
        this.contents = []
    }

    read  = () : Symbol => {
        return "X"
    }

    write = (a: Symbol) : void => {
        
    }
}