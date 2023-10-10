import Memory from "../memory/memory";

export default interface State {
    name : string,
    transitions : {[key : string]: State[]},
    mem : Memory
}