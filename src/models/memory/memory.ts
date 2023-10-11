export type Symbol = string | null

export default interface Memory {
    name : string,
    read: () => Symbol,
    write: (a : Symbol) => void,
    contents : () => Symbol[],
    getHead : () => number, 
}