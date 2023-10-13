import Coordinate from "~/utils/Coordinate"
import Memory, { Symbol } from "./memory"

export default class Queue implements Memory{
    readonly name : string
    readonly head = 0
    key: string = ""
    
    contents = []

    constructor(name : string, key: string = name){
        this.name = name
        this.key = key
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