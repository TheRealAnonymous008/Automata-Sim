import State, { IStateDetails, TransitionSymbol, getTransitionStr } from "~/models/states/state";
import Coordinate, { add, getDistance, mul, sub } from "../utils/Coordinate";
import { Machine } from "~/models/machine/machine";
import { getKeysInMap, getValuesInMap } from "~/utils/dictToList";
import "../styles/state.css"
import { For } from "solid-js";
import { TRANSITION_ANCHOR_DISTANCE, TRANSITION_LOOP_DISTANCE, TRANSITION_LOOP_OFFSET } from "~/styles/constants";
import { getAllSymbols } from "~/models/states/stateHelpers";

export default function TransitionComponent(props: {
    src : Coordinate,
    dest : Coordinate,
    forward: TransitionSymbol[],
    backward: TransitionSymbol[],
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

function TransitionLine(props : {src: Coordinate, dest: Coordinate, symbols : TransitionSymbol[], id : string, ctype: CurveType}){
    const pathId = `path${props.id}`
    return (
        <>
            <path
                id={pathId}
                d={getPath(props.src, props.dest, props.ctype)}
                fill="transparent"
                stroke="black"
                stroke-width="3"
                class = "hoverable"
            />

            <text dy={0} class ="transition-arrow">
                <textPath href={`#${pathId}`} startOffset="50%" dominant-baseline="central">{"<"}</textPath>
            </text>

            <For each={props.symbols}> 
                {(item : TransitionSymbol, index) => {
                    return (
                    <text dy={getTextOffset(props.ctype, index())} class = "transition-text">
                        <textPath 
                            startOffset="50%" 
                            dominant-baseline="central" 
                            alignment-baseline="central"
                            text-anchor="middle" 
                            href={`#${pathId}`} 
                        >
                            {getTransitionStr(item)}
                        </textPath>
                    </text>
                    )
                }
            }</For>
    </>
    )
}

export type TransitionUIHelper = {
    forward : TransitionSymbol[],
    backward : TransitionSymbol[],
    sourceloc : Coordinate,
    destloc: Coordinate,
}

export function getAllTransitionUIs(coordMap: Map<State, Coordinate>) : TransitionUIHelper[]{
    const S = getKeysInMap(coordMap)
    const TU : TransitionUIHelper[] = []

    S.forEach((src, idx) => {
        S.forEach((dest, jdx) => {
            if (jdx >= idx) {
                const tlist = getAllSymbols(src, dest)
                const forward = tlist.forward
                const backward = tlist.backward

                if (forward.length > 0 || backward.length > 0) {
                    TU.push({
                        sourceloc: coordMap.get(src)!,
                        destloc: coordMap.get(dest)!, 
                        backward: backward as unknown as TransitionSymbol[],
                        forward: forward as unknown as TransitionSymbol[]
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
            const midpoint : Coordinate= mul(add(src, dest),0.5)
            const veclength = getDistance(dest, midpoint)
            const vec : Coordinate = mul(sub(dest, midpoint), 1.0/veclength)
            const perpvec : Coordinate = { x: -vec.y , y: vec.x}
            const perpoffset = mul(perpvec, TRANSITION_ANCHOR_DISTANCE)

            const c : Coordinate = add(midpoint, perpoffset)
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
        case CurveType.STRAIGHT: return -20 * (1 + index) -5
        case CurveType.DOUBLE: return -20 * (1 + index) - 5
        case CurveType.LOOP: return -20 * (1 + index)
    }
}