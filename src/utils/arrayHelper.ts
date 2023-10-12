export function isOneDimensional(arr : any[]){
    return arr.every(entry => !Array.isArray(entry))
}

export function getMaxLength(arr: any[][]){
    let m = 0
    arr.forEach(element => {
        m = Math.max(element.length, m)
    });

    return m
}