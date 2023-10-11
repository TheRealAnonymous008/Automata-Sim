export function getValuesInDict(dictionary : {[key: string] : any}) : any[]{
    const values = []
    for (const key in dictionary) {
        if (key in dictionary) {
            let value = dictionary[key];
            values.push(value)
        }
    }

    return values
}