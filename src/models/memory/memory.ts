export default interface Memory {
    name : string,
    read: () => Symbol,
    write: (a : Symbol) => void
}

export type Symbol = String