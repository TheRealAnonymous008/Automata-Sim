import Coordinate from "~/components/Coordinate";
import State from "~/models/states/state";
import { EDGE_OFFSET } from "~/styles/constants";

export default function getStateLayout(viewWidth : number, viewHieght : number, states : State[]) : Map<State, Coordinate>{
    const map = new Map<State, Coordinate>()

    states.forEach((state) => {
        map.set(state, generateRandomCoord(viewWidth, viewHieght))
    })

    return map
}


function generateRandomCoord(mw : number, mh : number) : Coordinate{
    return {
        x : (mw - 2 * EDGE_OFFSET) * Math.random() + EDGE_OFFSET,
        y : (mh - 2 * EDGE_OFFSET) * Math.random() + EDGE_OFFSET
    }
}