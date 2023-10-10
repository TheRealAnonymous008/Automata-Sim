import Memory, { Symbol } from "./memory"

export default class Stack implements Memory{
    readonly name : string
    constructor(name : string){
        this.name = name
    }
    
    read  = () : Symbol => {
        return "X"
    }

    write = (a: Symbol) : void => {
        
    }
}