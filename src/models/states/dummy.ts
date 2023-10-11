import Memory from "../memory/memory";
import State from "./state";

export default class DummyState implements State{
    name: string;
    transitions: { [key: string]: State[]; };

    constructor(name : string){
        this.name = name
        this.transitions = {}
    }
}