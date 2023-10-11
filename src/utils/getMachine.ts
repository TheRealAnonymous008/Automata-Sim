import { Transition } from "solid-js/types/reactive/signal"
import { Machine, MemoryList, StateList } from "~/models/machine"
import Memory, { Symbol } from "~/models/memory/memory"
import Queue from "~/models/memory/queue"
import Stack from "~/models/memory/stack"
import Tape, { INPUT_TAPE_NAME, OUTPUT_TAPE_NAME } from "~/models/memory/tape"
import DummyState, { ACCEPT_STATE_NAME, AcceptState, REJECT_STATE_NAME, RejectState } from "~/models/states/dummy"
import ScanState from "~/models/states/scan"
import State from "~/models/states/state"

export default function getMachine(code : string) : Machine | null{
    if (code == ""){
        return null
    }
    var sections = tokenize(code)

    var memory = parseDataSection(sections.data)
    var logic = parseLogicSection(sections.logic, memory.memory, memory.input)

    return {
        memory : memory.memory,
        states: logic.states,
        input : memory.input
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

function parseDataSection(lines : string[]) : {
    memory : MemoryList,
    input : Memory
}
{
    var memory : MemoryList = {}
    var input : Memory | null = null

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')
        const name = toks[1]
        
        var memoryUnit : Memory

        switch(toks[0]) {
            case "STACK": 
                memoryUnit = new Stack(name); 
                break;
            case "QUEUE": 
                memoryUnit = new Queue(name); 
                break;
            case "TAPE": 
                memoryUnit = new Tape(name);   
                if (input == null){
                    input = memoryUnit!
                }
                break;
        }     
        memory[name] = memoryUnit!
    }

    // Assert input is not null. If it is, simply add a tape.
    if (input == null){
        input = new Tape("Input Tape")
        memory[INPUT_TAPE_NAME] = input
    }

    // We insert a special tape called the output tape. 
    memory[OUTPUT_TAPE_NAME] = new Tape("Output Tape")

    return {
        memory : memory,
        input : input!
    }
}

function parseLogicSection(lines : string[], memory: MemoryList, inputTape : Memory) : {
    states: StateList,
    alphabet : Symbol[],
    initial: State | null
 }
 {
    var states : StateList = {}
    var alphabet : Symbol[] = []
    var initial : State | null = null
    var transitions : {start : State, symbol : string, end : string}[] = []

    // Add special accept and reject state
    states[ACCEPT_STATE_NAME] = new AcceptState()
    states[REJECT_STATE_NAME] = new RejectState()

    // Identify all the states in the logic segment and set up transition parsing.
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')

        // Perform parsing here using the tokens
        let name = toks[0].slice(0, -1)
        let command = toks[1]

        // TODO: Initialize state here using a switch statement. For now we use a temporary scan state.
        let state = new ScanState(name, inputTape)
        states[name] = state

        if (initial == null){
            initial = state
            state.initial = true
        }

        // Each subsequent tok after command is of the form (,)
        for (let j = 2; j < toks.length; j++) {
            const tp = toks[j].replace('(', '').replace(')', '').split(',');
            const sym : string = tp[0] // temporary fix.
            let dest = tp[1]
            
            if (dest.toLowerCase() == ACCEPT_STATE_NAME.toLowerCase()){
                dest = ACCEPT_STATE_NAME
            } else if (dest.toLowerCase() == REJECT_STATE_NAME.toLowerCase()){
                dest = REJECT_STATE_NAME
            }

            transitions.push({
                start: state,
                symbol: sym, 
                end: dest
            })
        }
    }

    // Loop through each intermediate transition and add them to the states.
    // also formulate the alphabet
    transitions.forEach(element => {
        const trans = element.start.transitions
        const sym = element.symbol
        const dest = states[element.end]
        if (sym in trans)
            trans[sym].push(dest)
        else
            trans[sym] = [dest]

        if(!(sym in alphabet)){
            alphabet.push(sym as Symbol)
        }
    });

    return {
        states : states,
        alphabet: alphabet,
        initial: initial
    }
 }