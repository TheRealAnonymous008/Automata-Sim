import Memory from "./memory"

export default class Queue implements Memory{
    readonly name : string

    constructor(name : string){
        this.name = name
    }

    read  = () : string => {
        return "X"
    }

    write = (a: string) => {
        
    }
}