import { Title } from "solid-start";

export default function Home() {
  return (
    <main>
      <Title>About</Title>
        <h1 id="abstract-machine-specification">Abstract Machine Simulation</h1>
        <p>This document outlines the specifications for defining an abstract machine, which consists of two primary sections: the DATA section and the LOGIC section.</p>
        <h2 id="1-data-section">1. DATA Section</h2>
        <p>In the DATA section, you can declare auxiliary memory types to be used by the abstract machine. The section begins with the line <code>.DATA</code>, and it supports the following memory types:</p>
        <ul>
        <li><p><strong>{"STACK <stack_name>"}:</strong> Declares a stack with the given identifier. For example, <code>STACK S1</code> declares a stack named S1, which accesses memory in a Last-In-First-Out (LIFO) order.</p>
        </li>
        <li><p><strong>{"QUEUE <queue_name>"}:</strong> Declares a queue with the given identifier. For example, <code>QUEUE Q1</code> declares a queue named Q1, which accesses memory in a First-In-First-Out (FIFO) order.</p>
        </li>
        <li><p><strong>{"TAPE <tape_name>"}:</strong> Declares tape memory with the given identifier. For example, <code>TAPE T1</code> declares a tape named T1, which can be accessed freely by scanning it left and right, similar to a Turing Machine. If at least one tape is declared, the first tape is designated as the input tape.</p>
        </li>
        <li><p><strong>{"2D_TAPE <2D_tape_name>"}:</strong> Declares 2D tape memory with the given identifier. For example, <code>2D_TAPE P1</code> declares a 2D tape named P1, which can be accessed freely by scanning it left and right or up and down. If at least one 2D tape is declared, the first tape-type memory is designated as the input tape. If the first tape-type memory is a 2D Tape, the input is on the first/topmost row.</p>
        </li>
        </ul>
        <h2 id="2-logic-section">2. LOGIC Section</h2>
        <p>In the LOGIC section, you define the behavior of states using the following syntax:</p>
        <p>{"<SOURCE_STATE_NAME>] COMMAND (<SYMBOL_1>,<DESTINATION_STATE_NAME_1>),\
        (<SYMBOL_2>,<DESTINATION_STATE_NAME_2>),\
        ...\
        (<SYMBOL_N>,<DESTINATION_STATE_NAME_N>)"}</p>
        <p>Commands in the LOGIC section include:</p>
        <ul>
        <li><p><strong>SCAN:</strong> Reads one symbol from the input.</p>
        </li>
        <li><p><strong>PRINT:</strong> Produces one output symbol.</p>
        </li>
        <li><p><strong>SCAN RIGHT:</strong> Reads one symbol from the input to the right of the tape head and moves the tape head to that location.</p>
        </li>
        <li><p><strong>SCAN LEFT:</strong> Reads one symbol from the input to the left of the tape head and moves the tape head to that location.</p>
        </li>
        <li><p><strong>{"READ(<memory_object>):"}</strong> Reads one symbol from a given stack or queue.</p>
        </li>
        <li><p><strong>{"WRITE(<memory_object>):"}</strong> Writes one symbol to a given stack or queue, allowing nondeterministic behavior.</p>
        </li>
        <li><p><strong>{"RIGHT(<tape_name>)"}:</strong> Reads one symbol on an input tape to the right of the tape head, moves to that location, changes the state, and overwrites the symbol.</p>
        </li>
        <li><p><strong>{"LEFT(<tape_name>)"}:</strong> Reads one symbol on an input tape to the left of the tape head, moves to that location, changes the state, and overwrites the symbol.</p>
        </li>
        <li><p><strong>{"UP(<2D_tape_name>)"}:</strong> Reads one symbol on an input 2D tape to the north of the tape head, moves to that location, changes the state, and overwrites the symbol.</p>
        </li>
        <li><p><strong>{"Down(<2D_tape_name>)"}:</strong> Reads one symbol on an input 2D tape to the south of the tape head, moves to that location, changes the state, and overwrites the symbol.</p>
        </li>
        </ul>
        <p>Note that the format of the transitions should be {"(<TRANSITION_SYMBOL>,<STATE>)"}. For RIGHT / LEFT / UP / DOWN, the transition symbol is of the form {"<READ_SYMBOL>/<WRITE_SYMBOL>"} </p>
        <h2 id="3-controls">3  Controls</h2>
        <p>Enter the machine specifications with the above code.</p>
        <p>Then enter an input string in the appropriate field. Once entered, the box will highlight green if the machine accepts and red if it rejects. Warning: be sure not to cause an infinite loop).</p>
        <p>Playback options are provided to step forward, backward, or reset the machine to its initial configuration.</p>
        <p>There is also an option to highlight nondeterministic states (found below the state diagram). Click this button to toggle between highlighting and not highlighting</p>
    </main>
  );
}
