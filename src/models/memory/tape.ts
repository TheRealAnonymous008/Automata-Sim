import Memory, { Symbol, DELIMITER } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    readonly storage : Symbol[] = []
    updated : boolean = false

    head: number = 0

    constructor(name : string){
        this.name = name
    }

    read = () : Symbol => {
        this.toggle()
        if (this.head < 0 || this.head >= this.storage.length){
            return DELIMITER
        }
        return this.storage[this.head]
    }

    write = (a: Symbol) => {
        this.toggle()
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
        this.toggle()
        this.head--
    }

    right = () => {
        this.toggle()
        this.head++
    }

    contents = () => {
        return this.storage
    }

    getHead = () => {
        return this.head
    }

    toggle = () => {
        this.updated = !this.updated
    }
}