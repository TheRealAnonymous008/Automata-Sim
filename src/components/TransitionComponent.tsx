import Coordinate from "./Coordinate";

export default function TransitionComponent(props: {
    src : Coordinate,
    dest : Coordinate
}){
    return (
        <line 
            x1={props.src.x} 
            y1={props.src.y} 
            x2={props.dest.x} 
            y2={props.dest.y} 
            stroke="black" 
            stroke-width="3" 
        />
    )
}