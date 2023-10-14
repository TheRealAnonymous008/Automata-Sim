import Coordinate from "~/utils/Coordinate"
import Memory, { DELIMITER, EMPTY_STRING, Symbol } from "./memory"
import { GridMap } from "~/utils/arrayHelper"

export const INPUT_TAPE_NAME = "$"
export const OUTPUT_TAPE_NAME = ""

export default class Tape2D implements Memory{
    readonly name : string
    head: Coordinate = {x: 0, y: 0}
    key: string = ""
    contents : GridMap<Symbol> = new  Map<number, Map<number, Symbol>>()

    constructor(name : string, key: string = name){
        this.name = name
        this.flush()
    }

    flush = () => {
        this.head = {x: 0, y: 0}
        this.contents.clear()
        this.contents.set(0, new Map<number, Symbol>())
    }


    read  = () => {
        if (this.isInBounds()){
            return this.contents.get(this.head.y)!.get(this.head.x)!
        }
        return DELIMITER
    }

    write = (a: Symbol) => {
        if (this.isInBounds()) {
            this.replace(a)
        }
        else {
            if (this.contents.has(this.head.y) === false){
                this.contents.set(this.head.y, new Map<number, Symbol>())
            }
            if (this.contents.get(this.head.y)!.has(this.head.x) === false){
                this.contents.get(this.head.y)!.set(this.head.x, a)
            }
        }
        
        this.right()
    }

    left = () => {
        this.head.x--
    }

    right = () => {
        this.head.x++
    }

    up = () => {
        this.head.y--
    }

    down = () => {
        this.head.y++ 
    }

    resetHead = () => {
        this.head =  {
            x: 0,
            y :0
        }
    }

    replace = (a: Symbol) : Symbol=> {
        if (!this.isInBounds()){
            return EMPTY_STRING
        }

        const sym = this.contents.get(this.head.y)!.get(this.head.x)!
        this.contents.get(this.head.y)!.set(this.head.x, a)
        return sym
    }

    isInBounds = () => {
        return this.contents.has(this.head.y) && this.contents.get(this.head.y)!.has(this.head.x)
    }

}