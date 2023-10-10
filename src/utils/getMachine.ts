import { Machine } from "~/models/machine"
import Memory from "~/models/memory/memory"
import Queue from "~/models/memory/queue"
import Stack from "~/models/memory/stack"
import Tape from "~/models/memory/tape"
import State from "~/models/states/state"

export default function getMachine(code : string) : Machine | null{
    if (code == ""){
        return null
    }
    var sections = tokenize(code)

    var memory = parseDataSection(sections.data)
    var states = parseLogicSection(sections.logic)

    return {
        memory : memory,
        states: states
    }
}

function tokenize(code : string){
    const lines = code.split('\n')
    var dataSection : string[] = []
    var logicSection : string[] = []

    // Remove all newlines
    lines.forEach(element => {
        element.trim()
    });

    var dataStartIdx = -1
    var logicStartIdx = -1

    while (dataStartIdx < lines.length - 1){
        dataStartIdx += 1
        if (lines[dataStartIdx].toLowerCase() == ".data"){
            break
        }
    }

    logicStartIdx = dataStartIdx
    while (logicStartIdx < lines.length - 1){
        logicStartIdx += 1
        if (lines[logicStartIdx].toLowerCase() == ".logic"){
            break
        }
    }

    // Perform splits as needed
    lines.forEach((line, index) => {
        if (index > dataStartIdx && index < logicStartIdx){
            dataSection.push(line)
        } else if (index > logicStartIdx) {
            logicSection.push(line)
        }
    });
    return {
        data : dataSection,
        logic : logicSection
    }
}

function parseDataSection(lines : string[]) : Memory[] {
    var memory : Memory[] = []

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')
        switch(toks[0]) {
            case "STACK": memory.push(new Stack(toks[1])); break;
            case "QUEUE": memory.push(new Queue(toks[1])); break;
            case "TAPE": memory.push(new Tape(toks[1])); break;
        }
    }

    return memory
}

function parseLogicSection(lines : string[]) : State[] {
    return []
}