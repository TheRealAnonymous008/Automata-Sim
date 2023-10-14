# Abstract Machine Specification

This document outlines the specifications for defining an abstract machine, which consists of two primary sections: the DATA section and the LOGIC section.

## 1. DATA Section

In the DATA section, you can declare auxiliary memory types to be used by the abstract machine. The section begins with the line `.DATA`, and it supports the following memory types:

- **STACK <stack_name>:** Declares a stack with the given identifier. For example, `STACK S1` declares a stack named S1, which accesses memory in a Last-In-First-Out (LIFO) order.

- **QUEUE <queue_name>:** Declares a queue with the given identifier. For example, `QUEUE Q1` declares a queue named Q1, which accesses memory in a First-In-First-Out (FIFO) order.

- **TAPE <tape_name>:** Declares tape memory with the given identifier. For example, `TAPE T1` declares a tape named T1, which can be accessed freely by scanning it left and right, similar to a Turing Machine. If at least one tape is declared, the first tape is designated as the input tape.

- **2D_TAPE <2D_tape_name>:** Declares 2D tape memory with the given identifier. For example, `2D_TAPE P1` declares a 2D tape named P1, which can be accessed freely by scanning it left and right or up and down. If at least one 2D tape is declared, the first tape-type memory is designated as the input tape. If the first tape-type memory is a 2D Tape, the input is on the first/topmost row.

## 2. LOGIC Section

In the LOGIC section, you define the behavior of states using the following syntax:

<SOURCE_STATE_NAME>] COMMAND (<SYMBOL_1>,<DESTINATION_STATE_NAME_1>),
(<SYMBOL_2>,<DESTINATION_STATE_NAME_2>),
...
(<SYMBOL_N>,<DESTINATION_STATE_NAME_N>)

Commands in the LOGIC section include:

- **SCAN:** Reads one symbol from the input.

- **PRINT:** Produces one output symbol.

- **SCAN RIGHT:** Reads one symbol from the input to the right of the tape head and moves the tape head to that location.

- **SCAN LEFT:** Reads one symbol from the input to the left of the tape head and moves the tape head to that location.

- **READ(<memory_object>):** Reads one symbol from a given stack or queue.

- **WRITE(<memory_object>):** Writes one symbol to a given stack or queue, allowing nondeterministic behavior.

- **RIGHT(<tape_name>):** Reads one symbol on an input tape to the right of the tape head, moves to that location, changes the state, and overwrites the symbol.

- **LEFT(<tape_name>):** Reads one symbol on an input tape to the left of the tape head, moves to that location, changes the state, and overwrites the symbol.

- **UP(<2D_tape_name>):** Reads one symbol on an input 2D tape to the north of the tape head, moves to that location, changes the state, and overwrites the symbol.

- **Down(<2D_tape_name>):** Reads one symbol on an input 2D tape to the south of the tape head, moves to that location, changes the state, and overwrites the symbol.


Note that the format of the transitions should be (<TRANSITION_SYMBOL>,<STATE>). For RIGHT / LEFT / UP / DOWN, the transition symbol is of the form <READ_SYMBOL>/<WRITE_SYMBOL> 

## 3  Controls 
Enter the machine specifications with the above code.

Then enter an input string in the appropriate field. Once entered, the box will highlight green if the machine accepts and red if it rejects (warning: be sure not to cause an infinite loop).

Playback options are provided to step forward, backward, or reset the machine to its initial configuration.

There is also an option to highlight nondeterministic states (found below the state diagram). Click this button to toggle between highlighting and not highlighting

# Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
