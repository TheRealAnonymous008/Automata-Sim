import { Machine, MemoryList } from "~/models/machine"
import Memory from "~/models/memory/memory"
import Queue from "~/models/memory/queue"
import Stack from "~/models/memory/stack"
import Tape, { OUTPUT_TAPE_NAME } from "~/models/memory/tape"
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

function parseDataSection(lines : string[]) : MemoryList {
    var memory : MemoryList = {}

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')
        const name = toks[1]

        switch(toks[0]) {
            case "STACK": 
                memory[name] = new Stack(name); 
                break;
            case "QUEUE": 
                memory[name] = new Queue(name); 
                break;
            case "TAPE": 
                memory[name] = new Tape(name); 
                break;
        }
    }

    // We insert a special tape called the output tape. 
    memory[OUTPUT_TAPE_NAME] = new Tape("Output Tape")

    return memory
}

function parseLogicSection(lines : string[]) : State[] {
    return []
}