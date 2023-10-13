import { isAcceptState, isRejectState } from "../states/special";
import { SimulationNode } from "./snapshot";

export enum MachineResult  {
    ACCEPT = 0,
    REJECT = 1,
    CONTINUE = 2,
  }
  
  export function evaluateNode(node: SimulationNode){
      if (isAcceptState(node.state)){
        return MachineResult.ACCEPT
      }
      if (isRejectState(node.state)){
        return MachineResult.REJECT
      }
      return MachineResult.CONTINUE
  } 
  
  export function getShortestDerivation(node: SimulationNode) : SimulationNode {
      const queue: SimulationNode[] = [node];
      node.visited = true;
      let derivation: SimulationNode | null = null
      let shortestLeaf: SimulationNode | null = null
  
      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        const res = evaluateNode(currentNode)
  
        if (res == MachineResult.ACCEPT) {
          derivation = currentNode
          break
        }
        
        if (currentNode.next.length === 0 && shortestLeaf === null){
          shortestLeaf = currentNode
        }
  
        for (const nextNode of currentNode.next) {
          if (!nextNode.visited) {
            queue.push(nextNode);
            nextNode.visited = true;
          }
        }
      }
  
      let target = null 
  
      // If a derivation exists, use that instead
      if (derivation !== null) {
        target = derivation
      }
  
      // Perform a traversal to the shortest leaf instead
      else {
        target = shortestLeaf
      } 
  
      // Now get a path starting from the node down to the target.
      const path: SimulationNode[] = [];
      let currentNode: SimulationNode | null = target;
  
      while (currentNode) {
        const copy = {...currentNode}
        copy.next = []
        copy.parent = null
  
        path.unshift(copy);
        currentNode = currentNode.parent;
      }
  
      // Finally, connect the nodes and output a copy of the path. 
      for (let i = 0; i < path.length - 1; ++i){
        path[i].next = [path[i + 1]]
      }
  
      for (let i = 1; i < path.length; ++i){
        path[i].parent = path[i - 1]
      }
  
      return path[0]
  }