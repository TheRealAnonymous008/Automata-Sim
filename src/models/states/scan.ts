import Memory from "../memory/memory";
import State from "./state";


export default class ScanState implements State{
    name: string;
    transitions: { [key: string]: State[]; };
    mem: Memory;
    initial : boolean = false;
    accept: boolean = false;

    constructor(name : string, mem : Memory){
        this.name = name
        this.transitions = {}
        this.mem = mem
    }

    command = "S"
}