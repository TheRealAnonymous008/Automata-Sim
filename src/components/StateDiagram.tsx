import { Machine } from "~/models/machine";
import StateComponent from "./StateComponent";
import { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "~/models/states/dummy";

export default function StateDiagram(props :{
    machine : Machine
}){
    return (
        <>
            <h2> State Diagram </h2>
            <StateComponent state={props.machine.states[ACCEPT_STATE_NAME]}/>
            <StateComponent state={props.machine.states[REJECT_STATE_NAME]}/>
            <StateComponent state={props.machine.states["A"]}/>

        </>
    )
}   