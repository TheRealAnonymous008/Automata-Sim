import { Machine } from "~/models/machine"

export default function getMachine(code : string) : Machine | null{
    if (code == ""){
        return null
    }
    var tokens = tokenize(code)
    var ctr = 0

    console.log(tokens)
    // Get memory

    // Get logic

    return {
        memory : []
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