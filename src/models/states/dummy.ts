import Memory from "../memory/memory";
import State from "./state";

export const ACCEPT_STATE_NAME = "accept"
export const REJECT_STATE_NAME = "reject"

export default class DummyState implements State{
    name: string;
    transitions: { [key: string]: State[]; };

    constructor(name : string){
        this.name = name
        this.transitions = {}
    }

    command = () => {
        return ""
    }
}

export class AcceptState extends DummyState{
    constructor() {
        super("")
    }

    override command = () => {
        return ACCEPT_STATE_NAME
    }
}

export class RejectState extends DummyState{
    constructor() {
        super("")
    }

    override command = () => {
        return REJECT_STATE_NAME
    }
}