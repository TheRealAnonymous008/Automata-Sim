export default interface Coordinate {
    x : number, 
    y : number
}

export function getDistance(p1 : Coordinate, p2 : Coordinate){
    let dx = p1.x - p2.x 
    let dy = p1.y - p2.y
    return Math.sqrt(dx * dx + dy * dy)
}

export function getNorm(p : Coordinate){
    return Math.sqrt(p.x * p.x + p.y * p.y)
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

export function clampToBounds(p : Coordinate, tl: Coordinate, br : Coordinate) {
    return {
        x: Math.max(tl.x, Math.min(p.x, br.x)),
        y: Math.max(tl.y, Math.min(p.y, br.y))
    }
}

export function isEqual(p : Coordinate, q: Coordinate) {
    return p.x == q.x && p.y == q.y
}