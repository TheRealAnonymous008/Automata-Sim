import State, { getAllTransitions } from "~/models/states/state";
import Coordinate, { getDistance } from "./Coordinate";
import { Machine } from "~/models/machine";
import { getValuesInMap } from "~/utils/dictToList";
import { STATE_CIRCRADIUS } from "./StateComponent";

export default function TransitionComponent(props: {
    src : Coordinate,
    dest : Coordinate
}){
    const offx =  props.dest.x - props.src.x
    const offy = props.dest.y - props.src.y
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

            <line 
                x1={props.src.x} 
                y1={props.src.y} 
                x2={props.dest.x} 
                y2={props.dest.y} 
                stroke="black" 
                stroke-width="3" 
                marker-end="url(#arrowhead)"
            />
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