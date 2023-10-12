import Memory, { Symbol, DELIMITER } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    readonly storage : Symbol[] = []
    head: number = 0

    constructor(name : string){
        this.name = name
    }

    read = () : Symbol => {
        if (this.head < 0 || this.head >= this.storage.length){
            return DELIMITER
        }
        return this.storage[this.head]
    }

    write = (a: Symbol) => {
        let i = this.head 
        if (i < 0) {
            while(i < 0){
                this.storage.unshift(DELIMITER)
                i++
            }
            this.head = 0
        } else if (i >= this.storage.length){
            while(i > this.storage.length) {
                this.storage.push(DELIMITER)
                i--
            }
            this.head = this.storage.length - 1
        } 

        this.storage[this.head] = a
    }

    left = () => {
        this.head--
    }

    right = () => {
        this.head++
    }

    contents = () => {
        return this.storage
    }

    getHead = () => {
        return this.head
    }
}