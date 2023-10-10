import Memory from "./memory"

export default class Stack implements Memory{
    readonly name : string
    constructor(name : string){
        this.name = name
    }
    
    read  = () => {
        return "X"
    }

    write = (a: String) => {
        
    }
}