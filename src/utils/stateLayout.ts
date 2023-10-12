import Coordinate, { add, clampToBounds, getDistance, mul, sub } from "~/utils/Coordinate";
import State from "~/models/states/state";
import { ATTRACTION_STRENGTH, BOUNDS, LAYOUT_ITERATIONS, REPULSION_STRENGTH, STATE_BOUNDS, TARGET_TRANSITION_LENGTH } from "~/styles/constants";
import { shuffle } from "./shuffle";
import { getAllNeighbors, getCommonNeighbors, hasTransitions } from "~/models/states/stateHelpers";

export default function getStateLayout(viewWidth : number, viewHieght : number, states : State[]) : Map<State, Coordinate>{
    const map = new Map<State, Coordinate>()
    const graph = getGraph(states)

    console.log(graph)

    // define bounds
    const topLeft : Coordinate = {x : BOUNDS.left, y : BOUNDS.top}
    const bottomRight : Coordinate = {x : viewWidth - BOUNDS.right, y : viewHieght - BOUNDS.bottom}

    // Initialize all nodes' coords
    graph.nodes.forEach((node) => {
        node.coord = generateRandomCoord(viewWidth, viewHieght)
    })

    // Run algorithm 
    for(let i = 0; i < LAYOUT_ITERATIONS; ++i){
        // Shuffle to reduce bias.
        const E : Edge[] = shuffle(graph.edges)

        E.forEach((edge) => {
            const src = edge.src
            const dest = edge.dest

            const distance = Math.max(0.1, getDistance(src.coord, dest.coord) - 2 * STATE_BOUNDS)
            const offset = sub(edge.dest.coord, edge.src.coord)
            
            const attractiveForce = (distance - TARGET_TRANSITION_LENGTH) * edge.weight* ATTRACTION_STRENGTH;
            const repulsiveForce =  REPULSION_STRENGTH / (distance * distance)
            
            const delta = add(
                mul(offset, attractiveForce / distance),
                mul(offset, repulsiveForce / distance)
            )

            src.coord = add(src.coord, delta)
            dest.coord = add(dest.coord, delta)

            // Clamp src and dest
            src.coord = clampToBounds(src.coord, topLeft, bottomRight)
            dest.coord = clampToBounds(dest.coord, topLeft, bottomRight)
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
            if (i != j){
                const commonCount = getCommonNeighbors(src, dest).size
                const totalCount = getAllNeighbors(src).size + getAllNeighbors(dest).size 

                if (totalCount != 0) {
                    const affinity = commonCount / (totalCount - commonCount)
                    edges.push({
                        src: nodes[i],
                        dest: nodes[j],
                        weight: affinity
                    })
                } else {
                    edges.push({
                        src: nodes[i],
                        dest: nodes[j],
                        weight: 0
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