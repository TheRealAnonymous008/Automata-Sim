import { Transition } from "solid-js/types/reactive/signal"
import { Machine, MemoryList, StateList } from "~/models/machine/machine"
import Memory, { Symbol } from "~/models/memory/memory"
import Queue from "~/models/memory/queue"
import Stack from "~/models/memory/stack"
import Tape, { INPUT_TAPE_NAME, OUTPUT_TAPE_NAME } from "~/models/memory/tape"
import State, { ACCEPT_STATE_NAME, REJECT_STATE_NAME, TransitionSymbol } from "~/models/states/state"
import { getKeysInMap } from "./dictToList"
import Tape2D from "~/models/memory/tape2d"
import { scanLeftState, scanRightState, scanState } from "~/models/states/behaviors/scan"
import { acceptState, rejectState, defaultState, makeStateInitial } from "~/models/states/behaviors/special"
import { printState } from "~/models/states/behaviors/write"
import { leftState, readState, rightState, writeState } from "~/models/states/behaviors/memrw"
import { Console } from "console"
import { machine } from "os"

export default function getMachine(code : string) : Machine | null{
    if (code == ""){
        return null
    }
    var sections = tokenize(code)

    var memory = parseDataSection(sections.data)
    var logic = parseLogicSection(sections.logic, memory.memory, memory.memory.get(INPUT_TAPE_NAME) as Tape | Tape2D)

    return {
        memory : memory.memory,
        states: logic.states,
        input : memory.input,
        initial : logic.initial,
        currentState : logic.initial,
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
        if (lines[dataStartIdx].toLowerCase().trim() == ".data"){
            break
        }
    }

    while (logicStartIdx < lines.length - 1){
        logicStartIdx += 1
        if (lines[logicStartIdx].toLowerCase().trim() == ".logic"){
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
        input = new Tape("Input Tape", INPUT_TAPE_NAME)
        memory.set(INPUT_TAPE_NAME, input)
    }

    // We insert a special tape called the output tape. 
    memory.set(OUTPUT_TAPE_NAME, new Tape("Output Tape", OUTPUT_TAPE_NAME))

    return {
        memory : memory,
        input : input!
    }
}

function parseLogicSection(lines : string[], memory: MemoryList, inputTape : Tape | Tape2D) : {
    states: StateList,
    alphabet : Symbol[],
    initial: State
 }
 {
    var states : StateList = new Map<string, State>()
    var alphabet : Symbol[] = []
    var initial : State | null = null
    var transitions : {start : string, symbol : TransitionSymbol, end : string}[] = []

    // Add special accept and reject state
    states.set(ACCEPT_STATE_NAME, acceptState())
    states.set(REJECT_STATE_NAME, rejectState())

    // Identify all the states in the logic segment and set up transition parsing.
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        const toks = element.split(' ')

        // Trim each element
        toks.forEach((val) => val.trim())

        // Perform parsing here using the tokens
        let name = toks[0].slice(0, -1)
        let command = toks[1]
        let tidx = 2

        let state : State = defaultState("")
        if (command == "SCAN"){
            // Get the next token and check it. It can either be <RIGHT>, <LEFT> or neither.
            if (toks[tidx] == "RIGHT"){
                state = scanRightState(name, inputTape)
                ++tidx
            } else if (toks[tidx] == "LEFT"){
                state = scanLeftState(name, inputTape)
                ++tidx
            } else {
                state = scanState(name, inputTape)
            }
        } else if (command == "PRINT") {
            state = printState(name, memory.get(OUTPUT_TAPE_NAME)! as Tape)
        } else if (command.startsWith("READ")){
            const memname = command.replace("READ", "").replace('(', '').replace(')', '')
            const memoryObject = memory.get(memname)

            if (memoryObject === undefined){
                throw ("Error. Undefined memory object used")
            } else if (memoryObject instanceof Stack || memoryObject instanceof Queue) {
                state = readState(name, memoryObject)
            } else {
                throw("Error. Trying to perform READ on a memory object that is neither a stack nor a queue")
            }
        } else if (command.startsWith("WRITE")){
            const memname = command.replace("WRITE", "").replace('(', '').replace(')', '')
            const memoryObject = memory.get(memname)

            if (memoryObject === undefined){
                throw ("Error. Undefined memory object used")
            } else if (memoryObject instanceof Stack || memoryObject instanceof Queue) {
                state = writeState(name, memoryObject)
            } else {
                throw("Error. Trying to perform WRITE on a memory object that is neither a stack nor a queue")
            }
        } else if (command.startsWith("RIGHT")){
            const memname = command.replace("RIGHT", "").replace('(', '').replace(')', '')
            const memoryObject = memory.get(memname)

            if (memoryObject === undefined){
                throw ("Error. Undefined memory object used")
            } else if (memoryObject instanceof Tape || memoryObject instanceof Tape2D) {
                state = rightState(name, memoryObject)
            } else {
                throw("Error. Trying to perform RIGHT on a memory object that is not a tape")
            }
        } else if (command.startsWith("LEFT")){
            const memname = command.replace("LEFT", "").replace('(', '').replace(')', '')
            const memoryObject = memory.get(memname)

            if (memoryObject === undefined){
                throw ("Error. Undefined memory object used")
            } else if (memoryObject instanceof Tape || memoryObject instanceof Tape2D) {
                state = leftState(name, memoryObject)
            } else {
                throw("Error. Trying to perform LEFT on a memory object that is not a tape")
            }
        } 

        states.set(name, state)

        if (initial == null){
            initial = state 
            makeStateInitial(state)
        }

        // Each subsequent tok after command is of the form (,)
        for (let j = tidx; j < toks.length; j++) {
            var str = toks[j].trim().replace('(', '').replace(')', '')
            if (str.length === 0){
                continue
            }
            var tp = str.split(',');
            let tps = tp[0].split("/")
            let sym : TransitionSymbol = tp[0]

            if (tps.length === 2){
                sym = [tps[0], tps[1]]
            }

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

        // if(!(_sym! in alphabet)){
        //     alphabet.push(_sym)
        // }
    });

    return {
        states : states,
        alphabet: alphabet,
        initial: initial as State
    }
 }