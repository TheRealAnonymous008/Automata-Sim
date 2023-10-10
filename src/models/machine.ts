import Queue from "./memory/queue"
import Stack from "./memory/stack"
import Tape from "./memory/tape"

export type Memory = Stack | Queue | Tape

export type Machine = {
    memory : Memory[]
}