import State from "~/models/states/state";
import "../styles/state.css"
import { AcceptState } from "~/models/states/dummy";

export default function StateComponent(props : {state : State}){

    let circleClass = "regular-state" 
    circleClass += props.state instanceof AcceptState ? " accept-state" : ""; // For the accept state

    console.log(circleClass)
    return (
      <span class="state">
        {props.state.initial && <span class="initial-triangle"></span>} 
        <div class={circleClass}>
            <div class="state-command">
                {props.state.command()}
            </div>
        </div>

        {props.state.name.length > 0 && <div class="state-label">{props.state.name}</div>}
      </span>
    );
}