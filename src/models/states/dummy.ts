import Memory, { Symbol } from "../memory/memory";
import State from "./state";

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

export default class DummyState implements State{
    name: string;
    transitions : Map<Symbol, State[]>
    initial : boolean = false;
    accept: boolean = false;

    constructor(name : string){
        this.name = name
        this.transitions = new Map<Symbol, State[]>()
    }

    command = ""
}

export class AcceptState extends DummyState {

    constructor() {
        super("")
        this.accept = true
        this.command = ACCEPT_STATE_NAME
    }
}

export class RejectState extends DummyState{
    constructor() {
        super("")
        this.command = REJECT_STATE_NAME
    }
}