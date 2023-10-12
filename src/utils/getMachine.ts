import { Transition } from "solid-js/types/reactive/signal"
import { Machine, MemoryList, StateList } from "~/models/machine"
import Memory, { Symbol } from "~/models/memory/memory"
import Queue from "~/models/memory/queue"
import Stack from "~/models/memory/stack"
import Tape, { INPUT_TAPE_NAME, OUTPUT_TAPE_NAME } from "~/models/memory/tape"
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME } from "~/models/states/state"
import { getKeysInMap } from "./dictToList"
import Tape2D from "~/models/memory/tape2d"
import { acceptState, defaultState, makeStateInitial, rejectState, scanState } from "~/models/states/behaviors"
import { log } from "console"

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
        input : memory.input,
        initial : logic.initial,
        currentState : logic.initial,
        currentSymbol: null,
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
    var memory : MemoryList = new Map<string, Memory>()
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
            case "2D_TAPE":
                memoryUnit = new Tape2D(name)
                if (input == null){
                    input = memoryUnit!
                }
                break;
        }     
        memory.set(name, memoryUnit!)
    }

    // Assert input is not null. If it is, simply add a tape.
    if (input == null){
        input = new Tape("Input Tape")
        memory.set(INPUT_TAPE_NAME, input)
    }

    // We insert a special tape called the output tape. 
    memory.set(OUTPUT_TAPE_NAME, new Tape("Output Tape"))

    return {
        memory : memory,
        input : input!
    }
}

function parseLogicSection(lines : string[], memory: MemoryList, inputTape : Memory) : {
    states: StateList,
    alphabet : Symbol[],
    initial: State
 }
 {
    var states : StateList = new Map<string, State>()
    var alphabet : Symbol[] = []
    var initial : State | null = null
    var transitions : {start : string, symbol : Symbol, end : string}[] = []

    // Add special accept and reject state
    states.set(ACCEPT_STATE_NAME, acceptState())
    states.set(REJECT_STATE_NAME, rejectState())

    // Identify all the states in the logic segment and set up transition parsing.
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')

        // Perform parsing here using the tokens
        let name = toks[0].slice(0, -1)
        let command = toks[1]

        // TODO: Initialize state here using a switch statement. For now we use a temporary scan state.
        let state : State = defaultState("")
        if (command == "SCAN"){
            state = scanState(name, memory.get(INPUT_TAPE_NAME) as Tape | Tape2D)
        } else if (command == "PRINT") {
            state = scanState(name, memory.get(OUTPUT_TAPE_NAME) as Tape)
        }

        states.set(name, state)

        if (initial == null){
            initial = state 
            makeStateInitial(state)
        }

        // Each subsequent tok after command is of the form (,)
        for (let j = 2; j < toks.length; j++) {
            const tp = toks[j].replace('(', '').replace(')', '').split(',');
            const sym : Symbol = tp[0] as Symbol
            let dest = tp[1]
            
            if (dest.toLowerCase() == ACCEPT_STATE_NAME.toLowerCase()){
                dest = ACCEPT_STATE_NAME
            } else if (dest.toLowerCase() == REJECT_STATE_NAME.toLowerCase()){
                dest = REJECT_STATE_NAME
            }

            transitions.push({
                start: name,
                symbol: sym, 
                end: dest
            })
        }
    }

    // Loop through each intermediate transition and add them to the states.
    // also formulate the alphabet

    transitions.forEach(element => {
        const trans = states.get(element.start)!.transitions
        const _sym = element.symbol
        const dest = states.get(element.end)!

        if (getKeysInMap(trans).includes(_sym)) {
        //  Assert no duplicate transitions.
            if (! (trans.get(_sym)?.includes(dest))) {
                trans.get(_sym)!.push(dest)
            }
        }
        else {
            trans.set(_sym, [dest])
        }

        if(!(_sym! in alphabet)){
            alphabet.push(_sym)
        }
    });

    return {
        states : states,
        alphabet: alphabet,
        initial: initial as State
    }
 }