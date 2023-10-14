import Memory, { EMPTY_STRING, Symbol } from "./memory"

export default class Queue implements Memory{
    readonly name : string
    readonly head = 0
    key: string = ""

    inputAlphabet: Set<Symbol> = new Set<Symbol>()
    outputAlphabet: Set<Symbol> = new Set<Symbol>()
    contents : Symbol[] = []

    constructor(name : string, key: string = name){
        this.name = name
        this.key = key
    }

    flush = () => {
        this.contents = []
    }

    read  = () : Symbol => {
        const a = this.contents.pop()
        if (a == undefined){
            return null
        }

        return a
    }

    write = (a: Symbol) : void => {
        this.contents.unshift(a)
    }
    
    unwrite = () : void => {
        this.contents.shift()
    }
}