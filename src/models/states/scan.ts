import Memory, { Symbol } from "../memory/memory";
import State from "./state";


export default class ScanState implements State{
    name: string;
    transitions: Map<Symbol, State[]>;
    mem: Memory;
    initial : boolean = false;
    accept: boolean = false;

    constructor(name : string, mem : Memory){
        this.name = name
        this.transitions = new Map<Symbol, State[]>()
        this.mem = mem
    }

    command = "S"
}