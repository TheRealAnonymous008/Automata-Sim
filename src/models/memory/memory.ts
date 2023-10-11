export type Symbol = string 

export default interface Memory {
    name : string,
    read: () => Symbol,
    write: (a : Symbol) => void,
    contents : () => Symbol[],
    getHead : () => number, 
}