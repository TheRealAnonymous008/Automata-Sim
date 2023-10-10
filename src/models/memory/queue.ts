import Memory from "./memory"

export default class Queue implements Memory{
    readonly name : string

    constructor(name : string){
        this.name = name
    }

    read  = () => {
        return "Hello"
    }
    
    write = (a: String) => {
        
    }
}