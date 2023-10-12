import State, { getAllTransitions } from "~/models/states/state";
import Coordinate, { getDistance } from "./Coordinate";
import { Machine } from "~/models/machine";
import { getValuesInMap } from "~/utils/dictToList";
import { STATE_CIRCRADIUS } from "./StateComponent";
import "../styles/state.css"
import { For } from "solid-js";

const ANCHOR_DISTANCE = 50
const LOOP_DISTANCE = 150

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
            <defs>
                <marker 
                    id={`arrowhead${props.idx}`} 
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
    const midpoint : Coordinate =  {
        x: (props.src.x + props.dest.x) / 2,
        y: (props.src.y + props.dest.y) / 2
    }

    return (
        <>
            <path
                id={`path${props.id}`}
                d={getPath(props.src, props.dest, props.ctype)}
                fill="transparent"
                stroke="black"
                stroke-width="3"
                marker-end="url(#arrowhead)"
            />
            <For each={props.symbols}> 
                {(item : Symbol, index) => {
                    return (
                    <text dy={getTextOffset(props.ctype, index())} class = "transition-text">
                        <textPath 
                            startOffset="50%" 
                            dominant-baseline="central" 
                            alignment-baseline="middle"
                            text-anchor="middle" 
                            href={`#path${props.id}`} 
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
    switch(curveType) {
        case CurveType.STRAIGHT: 
            return `M${src.x} ${src.y} L${dest.x} ${dest.y}`
        case CurveType.DOUBLE: {
            // Render as a quadratic bezier curve. The anchor point is perpendicular to the midpoint
            const midpoint : Coordinate= { x: (src.x + dest.x) / 2, y: (src.y + dest.y) / 2}

            const veclength = getDistance(dest, midpoint)
            const vec : Coordinate = { x: (dest.x - midpoint.x) / veclength , y: (dest.y - midpoint.y) / veclength}
            const perpvec : Coordinate = { x: -vec.y , y: vec.x}
        
            const c : Coordinate = { x : midpoint.x + ANCHOR_DISTANCE * perpvec.x, y : midpoint.y + ANCHOR_DISTANCE * perpvec.y}
            return `M${src.x} ${src.y} Q${c.x} ${c.y}, ${dest.x} ${dest.y}`;
        }
        case CurveType.LOOP: {
            // Render as a quadratic bezier curve. The anchor points up
            const c : Coordinate = { x : src.x, y: src.y - LOOP_DISTANCE}
            return `M${src.x - STATE_CIRCRADIUS} ${src.y} Q${c.x} ${c.y}, ${dest.x + STATE_CIRCRADIUS} ${dest.y}`;
        }
    }
}

function getTextOffset(curveType : CurveType, index : number ){
    switch(curveType){
        case CurveType.STRAIGHT: return 10 * (1 + index)
        case CurveType.DOUBLE: return 10 * (1 + index)
        case CurveType.LOOP: return -10 * (1 + index)
    }
}