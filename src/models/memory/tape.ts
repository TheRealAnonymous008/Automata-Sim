import Memory, { Symbol, DELIMITER } from "./memory"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape implements Memory{
    readonly name : string
    contents : Symbol[] = []
    head: number = 0

    constructor(name : string){
        this.name = name
    }

    flush = () => {
        this.contents = []
        this.head = 0
    }

    read = () : Symbol => {
        if (this.head < 0 || this.head >= this.contents.length){
            return DELIMITER
        }
        return this.contents[this.head]
    }

    write = (a: Symbol) => {
        this.right()
        let i = this.head 
        if (i < 0) {
            while(i < 0){
                this.contents.unshift(DELIMITER)
                i++
            }
            this.head = 0
        } else if (i >= this.contents.length){
            while(i > this.contents.length) {
                this.contents.push(DELIMITER)
                i--
            }
        } 

        this.contents[this.head] = a
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