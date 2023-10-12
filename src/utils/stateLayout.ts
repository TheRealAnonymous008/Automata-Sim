import Coordinate, { add, clampToBounds, getDistance, getNorm, mul, sub } from "~/utils/Coordinate";
import State from "~/models/states/state";
import { ATTRACTION_STRENGTH, BOUNDS, LAYOUT_ITERATIONS, REPULSION_STRENGTH, STATE_BOUNDS, TARGET_TRANSITION_LENGTH } from "~/styles/constants";
import { shuffle } from "./shuffle";
import { getAllNeighbors, getCommonNeighbors } from "~/models/states/stateHelpers";

export default function getStateLayout(viewWidth : number, viewHieght : number, states : State[]) : Map<State, Coordinate>{
    const map = new Map<State, Coordinate>()
    const graph = getGraph(states)

    // define bounds
    const topLeft : Coordinate = {x : BOUNDS.left, y : BOUNDS.top}
    const bottomRight : Coordinate = {x : viewWidth - BOUNDS.right, y : viewHieght - BOUNDS.bottom}

    // Initialize all nodes' coords
    graph.nodes.forEach((node) => {
        node.coord = generateRandomCoord(viewWidth, viewHieght)
    })

    // 
    for(let i = 0; i < LAYOUT_ITERATIONS; ++i){
        // Shuffle to reduce bias.
        const E : Edge[] = shuffle(graph.edges)

        E.forEach((edge) => {
            const src = edge.src
            const dest = edge.dest

            const distance = Math.max(0.1, getDistance(src.coord, dest.coord) - 2 * STATE_BOUNDS)
            const offset = sub(edge.dest.coord, edge.src.coord)
            
            const attractiveForce = -(TARGET_TRANSITION_LENGTH - distance) * edge.weight * ATTRACTION_STRENGTH;
            const repulsiveForce =  -REPULSION_STRENGTH / (distance * distance * graph.nodes.length)
            
            const delta = add(
                mul(offset, attractiveForce / distance),
                mul(offset, repulsiveForce / distance)
            )

            src.coord = add(src.coord, delta)
            src.coord = clampToBounds(src.coord, topLeft, bottomRight)
        })
    }

    // Run GEM
    GEMLayout(graph, topLeft, bottomRight)

    // Finally return map
    graph.nodes.forEach((node) => {
        map.set(node.state, node.coord)
    })
    return map
}

function GEMLayout(graph : Graph, tl: Coordinate, br: Coordinate){
    // Run the algorithm
    if (graph.nodes.length === 0) {
        return 
    }
    
    const nVertices = graph.nodes.length
    const targetLength = TARGET_TRANSITION_LENGTH
    let barycenter = {x : 0, y: 0}

    const vArray : Node[] = shuffle(graph.nodes)

    for (let i = 0; i < LAYOUT_ITERATIONS; ++i){
        // Choose vertex to update
        const idx = i % nVertices
        const vertex = vArray[idx]

        let theta = getAllNeighbors(vertex.state).size + 1
        
        // Apply attractive force
        let force: Coordinate = 
            sub(mul(barycenter, 1/nVertices), vertex.coord)

        force = mul(force, theta * ATTRACTION_STRENGTH)
        // Random disturbance
        force = add(force, generateRandomCoord(STATE_BOUNDS, STATE_BOUNDS, STATE_BOUNDS / 2, STATE_BOUNDS / 2))

        // Exert forces from other nodes
        vArray.forEach((other : Node) => {
            if (other === vertex){
                return
            }

            const delta = sub(vertex.coord, other.coord)
            const distance = getDistance(other.coord, vertex.coord)
            const optimalLength = targetLength * targetLength

            // Apply repulsive force
            force = add(force, mul(delta, distance / optimalLength))

            // Add another attractive force
            const total = getAllNeighbors(vertex.state).size + getAllNeighbors(other.state).size
            const common = getCommonNeighbors(vertex.state, other.state).size
            const affinity = (common + 1) / (total - common + 1)

            if (! isNaN(affinity)){
                force = sub(force, mul(delta, (distance * affinity)/ (optimalLength * theta)))
            }
        })

        // Adjust force
        const absp = getNorm(force)
        force = mul(force, 0.1 / absp)

        // Adjust position
        vertex.coord = add(vertex.coord, force)
        vertex.coord = clampToBounds(vertex.coord, tl, br)

        // Update barycenter
        barycenter = add(barycenter, force)
    }
}

function generateRandomCoord(mw : number, mh : number, x : number = 0, y : number = 0) : Coordinate{
    return {
        x : mw * Math.random() - x,
        y : mh * Math.random() - y
    }
}

interface Graph {
    nodes : Node[],
    edges: Edge[]
}

interface Node {
    state: State
    coord: Coordinate,
    impulse: number 
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
            state: state,
            impulse: 0
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