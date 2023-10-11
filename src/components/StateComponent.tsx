import State from "~/models/states/state";
import "../styles/state.css"
import { AcceptState } from "~/models/states/dummy";

export default function StateComponent(props : {state : State, x : number, y : number}){

    let circleClass = "regular-state" 
    circleClass += props.state instanceof AcceptState ? " accept-state" : ""; // For the accept state

    console.log(circleClass)
    return (
      <div style={`left: ${props.x}px; top: ${props.y}px; position:absolute; display: float`}>
        <div class="state" >

          <span class ="state-container">
            {props.state.initial && 
              <svg width="30" height="40">
                <path d="M0 0 L30 20 L0 40 Z" fill="#333" />
              </svg>
            } 

            <div>
              <span class={circleClass}>
                  <div class="state-command">
                      {props.state.command()}
                  </div>
              </span>
              
              {props.state.name.length > 0 && <div class="state-label">{props.state.name}</div>}
            </div>
          </span>
        </div>
      </div>
    );
}