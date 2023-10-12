import { Machine } from "~/models/machine";
import Memory, {Symbol} from "~/models/memory/memory";
import { INPUT_TAPE_NAME } from "~/models/memory/tape";

export default function deepCopyMachine(machine : Machine) : Machine{
    const memory = new Map<string, Memory>()

    machine.memory.forEach((v, k) => {
        var contents : any[] = []
        v.contents.forEach((_v) => contents.push(_v))

        memory.set(k, {
            contents : contents as Symbol[] | Symbol[][],
            getHead: v.getHead, 
            name: v.name,
            read: v.read,
            write: v.write
        })
    })

    return {
        input : memory.get(INPUT_TAPE_NAME)!,
        memory: memory, 
        states: machine.states
    }
}