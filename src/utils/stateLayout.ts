import Coordinate, { add, clampToBounds, getDistance, mul, sub } from "~/utils/Coordinate";
import State from "~/models/states/state";
import { BOUNDS, TARGET_TRANSITION_LENGTH } from "~/styles/constants";
import { shuffle } from "./shuffle";
import { hasTransitions } from "~/models/states/stateHelpers";

export default function getStateLayout(viewWidth : number, viewHieght : number, states : State[]) : Map<State, Coordinate>{
    const map = new Map<State, Coordinate>()
    const graph = getGraph(states)
    const K = Math.sqrt(1 / graph.nodes.length);
    const N = graph.nodes.length

    // Initialize all nodes' coords
    graph.nodes.forEach((node) => {
        node.coord = generateRandomCoord(viewWidth, viewHieght)
    })

    // define bounds
    const topLeft : Coordinate = {x : BOUNDS.left, y : BOUNDS.top}
    const bottomRight : Coordinate = {x : viewWidth - BOUNDS.right, y : viewWidth - BOUNDS.bottom}

    const avgLength = Math.max(getDistance(topLeft,  bottomRight) / (Math.sqrt(N)), TARGET_TRANSITION_LENGTH)

    // Run algorithm 
    for(let i = 0; i < 100; ++i){
        // Shuffle to reduce bias.
        const E : Edge[] = shuffle(graph.edges)

        E.forEach((edge) => {
            const src = edge.src
            const dest = edge.dest
            const distance = Math.max(0.1, getDistance(src.coord, dest.coord))
            const offset = sub(edge.dest.coord, edge.src.coord)

            const force = (distance - avgLength) * K * edge.weight;
            const delta = mul(offset, force /distance)

            src.coord = add(src.coord, delta)
            dest.coord = add(dest.coord, mul(delta, -1))

            // Clamp src and dest
            src.coord = clampToBounds(src.coord, topLeft, bottomRight)
        })
    }

    // Finally return map
    graph.nodes.forEach((node) => {
        map.set(node.state, node.coord)
    })
    return map
}


function generateRandomCoord(mw : number, mh : number) : Coordinate{
    return {
        x : mw * Math.random(),
        y : mh * Math.random()
    }
}

interface Graph {
    nodes : Node[],
    edges: Edge[]
}

interface Node {
    state: State
    coord: Coordinate,
}

interface Edge {
    src : Node,
    dest: Node, 
    weight : number
}

function getGraph(states: State[]) : Graph{
    const nodes : Node[] = []
    const edges : Edge[] = []

    states.forEach((state, index) => {
        nodes.push({
            coord: {x: 0, y: 0},
            state: state
        })
    })

    states.forEach((src, i) => {
        states.forEach((dest, j) => {
            if (i < j){
                if (hasTransitions(src, dest)) {
                    edges.push({
                        src: nodes[i],
                        dest: nodes[j],
                        weight: 1
                    })
                } else {
                    edges.push({
                        src: nodes[i],
                        dest: nodes[j],
                        weight: 0.5
                    })
                }
            }
        })
    })

    return {
        nodes: nodes,
        edges: edges
    }
}