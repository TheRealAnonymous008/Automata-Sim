export default interface Memory {
    name : string,
    read: () => string,
    write: (a : string) => void
}