import { Stack } from "./Stack.js";

export function DepthFirstSearch(graph, start, end) {

    if (start === end) {
        console.log(start);
        return;
    }

    const g = graph.graph;
    const s = new Stack();
    const visited = new Set();

    s.push(start);

    while (!s.isEmpty()) {

        const cur_node = s.peek();
        s.pop();

        if (!visited.has(cur_node)) {

            console.log(cur_node);
            if (cur_node === end) break;

            const neighbors = g.get(cur_node);
            if (neighbors !== undefined) {
                for (const neighbor of neighbors) {
                    s.push(neighbor[0]);
                }
            }

            visited.add(cur_node);
        }
    }
}

export function DepthFirstTraversal(graph, start) {
    
    const g = graph.graph;
    const s = new Stack();
    const visited = new Set();

    s.push(start);

    while (!s.isEmpty()) {

        const cur_node = s.peek();
        s.pop();

        if (!visited.has(cur_node)) {

            console.log(cur_node); // temp fill in function

            const neighbors = g.get(cur_node);
            if (neighbors !== undefined) {
                for (const neighbor of neighbors) {
                    s.push(neighbor[0]);
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

console.log("DFS - Traversal: \n");
DepthFirstTraversal(g, g.nodes[0]);

console.log("DFS - Search: \n");
DepthFirstSearch(g, g.nodes[0], g.nodes[2]);
}