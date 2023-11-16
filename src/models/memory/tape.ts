import Memory, { Symbol, DELIMITER, EMPTY_STRING } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    contents : Symbol[] = []
    head: number = 0
    key: string = ""
    
    inputAlphabet: Set<Symbol> = new Set<Symbol>()
    outputAlphabet: Set<Symbol> = new Set<Symbol>()

    constructor(name : string, key: string = name){
        this.key = key
        this.name = name
    }

    flush = () => {
        this.contents = []
        this.head = 0
    }

    read = () : Symbol => {
        if (this.head < 0){
            this.contents.unshift(DELIMITER)
            this.head = 0
            return DELIMITER
        }
        if (this.head >= this.contents.length){
            this.contents.push(DELIMITER)
            return DELIMITER
        }

        return this.contents[this.head]
    }

    // Use Write explicitly for writing with padding
    write = (a: Symbol) => {
        let i = this.head 
        
        if (i < 0) {
            while(i < 0){
                this.contents.unshift(DELIMITER)
                i++
            }
            this.head = 0
        } else if (i >= this.contents.length){
            while(i >= this.contents.length) {
                this.contents.push(DELIMITER)
                i--
            }
        } 

        this.contents[this.head] = a
        this.right()
    }

    // Use replace for replacing without moving
    replace = (a: Symbol) : Symbol => {
        if (this.head < 0 || this.head >= this.contents.length)
            return EMPTY_STRING

        const b = this.contents[this.head]
        this.contents[this.head] = a

        return b
    }

    left = () => {
        this.head--
    }

    right = () => {
        this.head++
    }

    getHead = () => {
        return this.head
    }

    resetHead = () => {
        this.head = 0
    }
}