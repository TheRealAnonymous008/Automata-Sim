export default interface Coordinate {
    x : number, 
    y : number
}

export function getDistance(p1 : Coordinate, p2 : Coordinate){
    let dx = p1.x - p2.x 
    let dy = p1.y - p2.y
    return Math.sqrt(dx * dx + dy * dy)
}