import State, { getAllTransitions } from "~/models/states/state";
import Coordinate, { getDistance } from "./Coordinate";
import { Machine } from "~/models/machine";
import { getValuesInMap } from "~/utils/dictToList";
import { STATE_CIRCRADIUS } from "./StateComponent";
import "../styles/state.css"
import { For } from "solid-js";

export default function TransitionComponent(props: {
    src : Coordinate,
    dest : Coordinate,
    forward: Symbol[],
    backward: Symbol[]
}){
    return (
        <>
            <defs>
                <marker 
                    id="arrowhead" 
                    markerWidth="10" 
                    markerHeight="7" 
                    refX={5 + STATE_CIRCRADIUS / 2.5}
                    refY="3.5"
                    orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
            </defs>
            {
                props.forward.length > 0 && 
                <TransitionLine src={props.src} dest={props.dest} symbols={props.forward}/>
            }

            {
                props.backward.length > 0 && 
                <TransitionLine src={props.dest} dest={props.src} symbols={props.backward}/>
            }
        </>
    )
}

function TransitionLine(props : {src: Coordinate, dest: Coordinate, symbols : Symbol[]}){
    const midpoint : Coordinate =  {
        x: (props.src.x + props.dest.x) / 2,
        y: (props.src.y + props.dest.y) / 2
    }

    return (
        <>
            <line 
                x1={props.src.x} 
                y1={props.src.y} 
                x2={props.dest.x} 
                y2={props.dest.y} 
                stroke="black" 
                stroke-width="3" 
                marker-end="url(#arrowhead)"
            />
            <path
                d={getPath(props.src, props.dest)}
                fill="transparent"
                stroke="green"
                stroke-width="2"
                marker-end="url(#middle-marker)"
            />
            <For each={props.symbols}> 
                {(item : Symbol) => {
                    return <text x={midpoint.x} y={midpoint.y} class = "transition-text">{item.toString()}</text>
                }
            }</For>
    </>
    )
}

export type TransitionUIHelper = {
    forward : Symbol[],
    backward : Symbol[],
    source : State,
    dest: State,
}

export function getAllTransitionUIs(machine : Machine) : TransitionUIHelper[]{
    const S = getValuesInMap(machine.states)
    const TU : TransitionUIHelper[] = []

    S.forEach((src, idx) => {
        S.forEach((dest, jdx) => {
            if (jdx >= idx) {
                const tlist = getAllTransitions(src, dest)
                const forward = tlist.forward
                const backward = tlist.backward

                if (forward.length > 0 || backward.length > 0) {
                    TU.push({
                        source: src,
                        dest: dest, 
                        backward: backward as unknown as Symbol[],
                        forward: forward as unknown as Symbol[]
                    })
                }
            }  
        })
    });

    return TU
}

function getPath(src: Coordinate, dest : Coordinate) {
    // Calculate control points for the Bezier curve
    const c1 : Coordinate= {
        x: src.x + (dest.x - src.x) * 0.25,
        y: src.y + 1.0 / (dest.y - src.y)
    }
    const c2 : Coordinate= {
        x: src.x + (dest.x - src.x) * 0.75,
        y: src.y + 1.0 /(dest.y - src.y)
    }

    // Construct the path data string
    const path = `M${src.x} ${src.y} C${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${dest.x} ${dest.y}`;
  
    return path;
  }