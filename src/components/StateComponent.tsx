import State from "~/models/states/state";
import "../styles/state.css"
import Coordinate from "../utils/Coordinate";
import { STATE_CIRCRADIUS, STATE_RECTOFFSET, STATE_RECTWIDTH, STATE_RECTHEIGHT } from "~/styles/constants";

export default function StateComponent(props : {state : State, loc : Coordinate}){

    let state = props.state
    let loc = props.loc

    return (
      <>
        {
          state.initial &&
          <path 
            d={getTrianglePath(loc)} 
            fill="#333" 
          />
        }

        <circle 
          cx={loc.x} 
          cy={loc.y} 
          r={STATE_CIRCRADIUS} 
          class="state-circle" 
        />
        {
          state.accept && 
          <circle 
            cx={loc.x} 
            cy={loc.y} 
            r={STATE_CIRCRADIUS * 0.85} 
            class="state-circle" 
          />
        }
        
        <text 
          x={loc.x} 
          y={loc.y} 
          text-anchor="middle" 
          dominant-baseline="middle" 
          class="state-text">
            {state.command}
        </text>

        {
          state.name.length > 0 && 
          <>
            <text 
              x={loc.x + STATE_RECTOFFSET.x + STATE_RECTWIDTH / 2} 
              y= {loc.y + STATE_RECTOFFSET.y + STATE_RECTHEIGHT / 2} 
              text-anchor="middle" 
              dominant-baseline="middle" 
              class="label-text">
                {state.name}
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