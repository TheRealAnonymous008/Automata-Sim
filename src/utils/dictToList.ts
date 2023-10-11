export function getValuesInMap<K, V>(map : Map<K, V>) : V[]{
    const values : V[] = []

    for(let v of map.values()){
        values.push(v)
    }

    return values
}

export function getKeysInMap<K, V>(map : Map<K, V>) : K[]{
    const keys : K[] = []

    for(let k of map.keys()){
        keys.push(k)
    }

    return keys
}