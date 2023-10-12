import Memory, { Symbol } from "./memory"

export default class Stack implements Memory{
    readonly name : string
    readonly storage : Symbol[] = []

    constructor(name : string){
        this.name = name
    }
    
    read  = () : Symbol => {
        return "X"
    }

    write = (a: Symbol) : void => {
        
    }

    contents = () => {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'A', 'A', 'A', 'A']
    }

    getHead = () => {
        return this.contents().length - 1
    }
}