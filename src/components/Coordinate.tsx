export default interface Coordinate {
    x : number, 
    y : number
}

export function getDistance(p1 : Coordinate, p2 : Coordinate){
    let dx = p1.x - p2.x 
    let dy = p1.y - p2.y
    return Math.sqrt(dx * dx + dy * dy)
}

export function add(p1 : Coordinate, p2: Coordinate) : Coordinate{
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}

export function sub(p1 : Coordinate, p2: Coordinate) : Coordinate{
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    }
}


export function mul(p: Coordinate, s : number) : Coordinate{
    return {
        x: p.x * s,
        y: p.y * s
    }
}