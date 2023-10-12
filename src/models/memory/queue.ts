import Memory, { Symbol } from "./memory"

export default class Queue implements Memory{
    readonly name : string
    readonly storage : Symbol[] = []
    updated : boolean = false

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
        return 0
    }
}