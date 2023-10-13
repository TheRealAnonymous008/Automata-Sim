import Memory, { Symbol } from "./memory"

export default class Stack implements Memory{
    readonly name : string
    key: string = ""
    head = -1
    contents : Symbol[] = []
    
    constructor(name : string, key: string = name){
        this.name = name
        this.key = name
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