import Memory, { EMPTY_STRING, Symbol } from "./memory"

export default class Stack implements Memory{
    readonly name : string
    key: string = ""
    head = -1
    
    alphabet: Symbol[] = []
    contents : Symbol[] = []
    
    constructor(name : string, key: string = name){
        this.name = name
        this.key = name
    }
    
    flush = () => {
        this.contents = []
    }

    read  = () : Symbol => {
        const a = this.contents.pop()
        if (a === undefined){
            return EMPTY_STRING
        }
        
        this.head --
        return a

    }

    write = (a: Symbol) : void => {
        this.contents.push(a)
        this.head ++
    }

    unwrite = () : void => {
        this.contents.pop()
        this.head--
    }
}