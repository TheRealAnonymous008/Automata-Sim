import State, { IStateDetails } from "~/models/states/state";
import "../styles/state.css"
import Coordinate from "../utils/Coordinate";
import { STATE_CIRCRADIUS, STATE_RECTOFFSET, STATE_RECTWIDTH, STATE_RECTHEIGHT } from "~/styles/constants";

export default function StateComponent(props :IStateDetails){
    return (
      <>
        {
          props.initial &&
          <path 
            d={getTrianglePath(props.loc)} 
            fill="#333" 
          />
        }

        <circle 
          cx={props.loc.x} 
          cy={props.loc.y} 
          r={STATE_CIRCRADIUS} 
          class={props.isActive ? "state-circle highlighted" : "state-circle"} 
        />
        {
          props.accept && 
          <circle 
            cx={props.loc.x} 
            cy={props.loc.y} 
            r={STATE_CIRCRADIUS * 0.85} 
            class={props.isActive ? "state-circle highlighted" : "state-circle"} 
          />
        }
        
        <text 
          x={props.loc.x} 
          y={props.loc.y} 
          text-anchor="middle" 
          dominant-baseline="middle" 
          class="state-text">
            {props.command}
        </text>

        {
          props.name.length > 0 && 
          <>
            <text 
              x={props.loc.x + STATE_RECTOFFSET.x + STATE_RECTWIDTH / 2} 
              y= {props.loc.y + STATE_RECTOFFSET.y + STATE_RECTHEIGHT / 2} 
              text-anchor="middle" 
              dominant-baseline="middle" 
              class="label-text">
                {props.name}
            </text>
          </>
        }
      </>
    );
}

function getTrianglePath(loc : Coordinate){
  const x = loc.x - STATE_CIRCRADIUS - 20
  const y = loc.y - STATE_CIRCRADIUS + 20

  return `M${x} ${y} L${x + 30} ${y + 20} L${x} ${y + 40} Z`
}