import Coordinate, { add, getDistance, mul, sub } from "~/components/Coordinate";
import State, { getAllTransitions, hasTransitions } from "~/models/states/state";
import { EDGE_OFFSET, TARGET_TRANSITION_LENGTH } from "~/styles/constants";

export default function getStateLayout(viewWidth : number, viewHieght : number, states : State[]) : Map<State, Coordinate>{
    const map = new Map<State, Coordinate>()
    const graph = getGraph(states)
    const K = Math.sqrt(1 / graph.nodes.length);

    // Initialize all nodes' coords
    graph.nodes.forEach((node) => {
        node.coord = generateRandomCoord(viewWidth, viewHieght)
    })

    // Run algorithm 
    for(let i = 0; i < 100; ++i){
        graph.edges.forEach((edge) => {
            const src = edge.src
            const dest = edge.dest
            const distance = Math.max(0.1, getDistance(src.coord, dest.coord))
            const offset = sub(edge.dest.coord, edge.src.coord)

            const force = (distance - TARGET_TRANSITION_LENGTH) * K;
            const delta = mul(offset, force /distance)

            src.coord = add(src.coord, delta)
            dest.coord = add(dest.coord, mul(delta, -1))
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
        x : (mw - 2 * EDGE_OFFSET) * Math.random() + EDGE_OFFSET,
        y : (mh - 2 * EDGE_OFFSET) * Math.random() + EDGE_OFFSET
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
    dest: Node
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
                        dest: nodes[j]
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