export function getValuesInMap<K, V>(map : Map<K, V>) : V[]{
    const values : V[] = []

    for(let v of map.values()){
        values.push(v)
    }

    return values
}