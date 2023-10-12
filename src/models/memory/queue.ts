import Coordinate from "~/utils/Coordinate"
import Memory, { Symbol } from "./memory"

export default class Queue implements Memory{
    readonly name : string
    contents = []

    constructor(name : string){
        this.name = name
    }

    getHead = () => {
        return 0
    }

    read  = () : Symbol => {
        return "X"
    }

    write = (a: Symbol) : void => {
        
    }
}