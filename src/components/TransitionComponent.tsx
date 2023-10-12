import State, { getAllTransitions } from "~/models/states/state";
import Coordinate, { getDistance } from "./Coordinate";
import { Machine } from "~/models/machine";
import { getValuesInMap } from "~/utils/dictToList";
import "../styles/state.css"
import { For } from "solid-js";
import { STATE_CIRCRADIUS, TRANSITION_ANCHOR_DISTANCE, TRANSITION_LOOP_DISTANCE, TRANSITION_LOOP_OFFSET } from "~/styles/constants";

export default function TransitionComponent(props: {
    src : Coordinate,
    dest : Coordinate,
    forward: Symbol[],
    backward: Symbol[],
    idx : number
}){
    const ctype : CurveType = (props.src === props.dest) ? CurveType.LOOP :
        (props.forward.length != 0 && props.backward.length != 0) ? CurveType.DOUBLE : CurveType.STRAIGHT

    return (
        <>
            {
                props.forward.length > 0 && 
                <TransitionLine src={props.src} dest={props.dest} symbols={props.forward} id={`f${props.idx}`} ctype={ctype}/>
            }

            {
                props.backward.length > 0 && 
                <TransitionLine src={props.dest} dest={props.src} symbols={props.backward} id={`b${props.idx}`} ctype={ctype}/>
            }
        </>
    )
}

function TransitionLine(props : {src: Coordinate, dest: Coordinate, symbols : Symbol[], id : string, ctype: CurveType}){
    const pathId = `path${props.id}`
    return (
        <>
            <path
                id={pathId}
                d={getPath(props.src, props.dest, props.ctype)}
                fill="transparent"
                stroke="black"
                stroke-width="3"
            />

            <text dy={0} class ="transition-arrow">
                <textPath href={`#${pathId}`} startOffset="50%" dominant-baseline="central">{">"}</textPath>
            </text>

            <For each={props.symbols}> 
                {(item : Symbol, index) => {
                    return (
                    <text dy={getTextOffset(props.ctype, index())} class = "transition-text">
                        <textPath 
                            startOffset="50%" 
                            dominant-baseline="central" 
                            alignment-baseline="central"
                            text-anchor="middle" 
                            href={`#${pathId}`} 
                        >
                            {item.toString()}
                        </textPath>
                    </text>
                    )
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

enum CurveType {
    STRAIGHT,
    DOUBLE,
    LOOP
}

function getPath(src: Coordinate, dest : Coordinate, curveType : CurveType) {
    // Note: start at dest so that the text is placed outside and not inside.

    switch(curveType) {
        case CurveType.STRAIGHT: 
            return `M${dest.x} ${dest.y} L${src.x} ${src.y}`
        case CurveType.DOUBLE: {
            // Render as a quadratic bezier curve. The anchor point is perpendicular to the midpoint
            const midpoint : Coordinate= { x: (src.x + dest.x) / 2, y: (src.y + dest.y) / 2}

            const veclength = getDistance(dest, midpoint)
            const vec : Coordinate = { x: (dest.x - midpoint.x) / veclength , y: (dest.y - midpoint.y) / veclength}
            const perpvec : Coordinate = { x: -vec.y , y: vec.x}
        
            const c : Coordinate = { x : midpoint.x + TRANSITION_ANCHOR_DISTANCE * perpvec.x, y : midpoint.y + TRANSITION_ANCHOR_DISTANCE * perpvec.y}
            return `M${dest.x} ${dest.y} Q${c.x} ${c.y}, ${src.x} ${src.y}`;
        }
        case CurveType.LOOP: {
            // Render as a quadratic bezier curve. The anchor points up
            const c : Coordinate = { x : src.x, y: src.y - TRANSITION_LOOP_DISTANCE}
            return `M${dest.x - TRANSITION_LOOP_OFFSET} ${dest.y} Q${c.x} ${c.y}, ${src.x + TRANSITION_LOOP_OFFSET} ${src.y}`;
        }
    }
}

function getTextOffset(curveType : CurveType, index : number ){
    switch(curveType){
        case CurveType.STRAIGHT: return -10 * (1 + index) -5
        case CurveType.DOUBLE: return -10 * (1 + index) - 5
        case CurveType.LOOP: return -10 * (1 + index)
    }
}