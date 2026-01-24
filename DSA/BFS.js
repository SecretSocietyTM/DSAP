import { Queue } from "./Queue.js";

export function BreadthFirstSearch(graph, start, end) {

    if (start === end) {
        console.log(start);
        return;
    }

    const g = graph.graph; // g is a map of type - u : [[v, weight], ...]
    const q = new Queue();
    const visited = new Set();

    q.enqueue(start);

    while (!q.isEmpty()) {
        
        const cur_node = q.peek();
        q.dequeue();

        if (!visited.has(cur_node)) {

            console.log(cur_node); // temp fill in function
            if (cur_node === end) break;

            const neighbors = g.get(cur_node);
            if (neighbors !== undefined) {
                for (const neighbor of neighbors) {
                    q.enqueue(neighbor[0]);
                }   
            }

            visited.add(cur_node);
        }
    }
}

export function BreadthFirstTraversal(graph, start) {

    const g = graph.graph;
    const q = new Queue();
    const visited = new Set();

    q.enqueue(start);

    while (!q.isEmpty()) {
        
        const cur_node = q.peek();
        q.dequeue();

        if (!visited.has(cur_node)) {

            console.log(cur_node); // temp fill in function

            const neighbors = g.get(cur_node);
            if (neighbors !== undefined) {
                for (const neighbor of neighbors) {
                    q.enqueue(neighbor[0]);
                }   
            }

            visited.add(cur_node);
        }
    }
}

//////////////////// TESTING ////////////////////

// flags for csv
// w = weighted | uw = unweighted
// d = directed | ud = undirected
import { Graph } from "./Graph.js";
if (true)
{

// from book
const csv = 
`   
d
uw
A,B
A,C
B,D
C,E
D,F
E,F
`

const g = new Graph(csv);
console.log(g);

console.log("BFS - Traversal: \n");
BreadthFirstTraversal(g, g.nodes[0]);

console.log("BFS - Search: \n");
BreadthFirstSearch(g, g.nodes[0], g.nodes[2]);
}