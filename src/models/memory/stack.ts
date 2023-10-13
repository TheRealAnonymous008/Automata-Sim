import Memory, { Symbol } from "./memory"

export default class Stack implements Memory{
    readonly name : string
    head = -1
    contents : Symbol[] = []

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