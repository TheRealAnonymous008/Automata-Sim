import State from "~/models/states/state";
import "../styles/state.css"
import { AcceptState } from "~/models/states/dummy";

export default function StateComponent(props : {state : State}){

    const circleClass = props.state instanceof AcceptState ? "accept-state" : "regular-state"; // For the accept state

    console.log(circleClass)
    return (
      <div class="state">
        <div class={circleClass}>
            <div class="state-command">
                {props.state.command()}
            </div>
            {props.state.name.length > 0 && <div class="state-label">{props.state.name}</div>}
        </div>
      </div>
    );
}