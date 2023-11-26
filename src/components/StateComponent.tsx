import State, { IStateDetails } from "~/models/states/state";
import "../styles/state.css"
import Coordinate from "../utils/Coordinate";
import { STATE_CIRCRADIUS, STATE_RECTOFFSET, STATE_RECTWIDTH, STATE_RECTHEIGHT } from "~/styles/constants";

export default function StateComponent(props : {details: IStateDetails, highlight: boolean}){
  const getClass= () => {
    let className = "state-circle "
    className += (props.highlight && props.details.isND ? " nondeterministic": "")
    className += (props.details.isActive ? " highlighted" : "")

    return className
  }

    return (
      <g>
        {
          props.details.initial &&
          <path 
            d={getTrianglePath(props.details.loc)} 
            fill="#333" 
          />
        }

        <circle 
          cx={props.details.loc.x} 
          cy={props.details.loc.y} 
          r={STATE_CIRCRADIUS} 
          class={getClass()} 
        />
        {
          props.details.accept && 
          <circle 
            cx={props.details.loc.x} 
            cy={props.details.loc.y} 
            r={STATE_CIRCRADIUS * 0.85} 
            class={getClass()} 
          />
        }
        
        <text 
          x={props.details.loc.x} 
          y={props.details.loc.y} 
          text-anchor="middle" 
          dominant-baseline="middle" 
          class="state-text">
            {props.details.command}
        </text>

        {
          props.details.name.length > 0 && 
          <>
            <text 
              x={props.details.loc.x + STATE_RECTOFFSET.x + STATE_RECTWIDTH / 2} 
              y= {props.details.loc.y + STATE_RECTOFFSET.y + STATE_RECTHEIGHT / 2} 
              text-anchor="middle" 
              dominant-baseline="middle" 
              class="label-text">
                {props.details.name}
            </text>
          </>
        }
      </g>
    );
}

function getTrianglePath(loc : Coordinate){
  const x = loc.x - STATE_CIRCRADIUS - 20
  const y = loc.y - STATE_CIRCRADIUS + 20

  return `M${x} ${y} L${x + 30} ${y + 20} L${x} ${y + 40} Z`
}