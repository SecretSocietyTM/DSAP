export function Dijkstra(graph, start) {

    const g = graph.graph;
    let visited_count = 0;
    // key: [dist, pred, visited]
    const nodes_info = new Map();


    for (const node of graph.nodes) {
        node === start ? 
        nodes_info.set(node, [0, null, false]) :
        nodes_info.set(node, [Infinity, null, false]);
    }

    // TODO: remove - for testing purposes only
    /* console.log(nodes_info); */

    while (visited_count < graph.nodeCount()) {
        const n = getMinDistUnvisitedNode(nodes_info); // [nodeLabel, [dist, pred, visited]]
        const n_info = n[1];

        const neighbors = g.get(n[0]);

        if (neighbors !== undefined) {
            for (const neighbor of neighbors) { // neighbors [nodeLabel, weight]

                const neighbor_info = nodes_info.get(neighbor[0]);
                const combined_cost = n_info[0] + neighbor[1];

                if (combined_cost < neighbor_info[0]) {
                    neighbor_info[0] = combined_cost;
                    neighbor_info[1] = n[0];
                }
            }
        }

        n_info[2] = true;
        visited_count++;

        // TODO: remove - for testing purposes only
        console.log("nodes visited: ", visited_count);
        for (const n of [...nodes_info]) {
            console.log(`${n[0]} : [${n[1][0]}, ${n[1][1]}, ${n[1][2]}]`);
        }
    }
}

export function DijkstraSearch(graph, start, end) {

    if (start === end) return [end];

    const g = graph.graph;
    let visited_count = 0;
    // key: [dist, pred, visited]
    const nodes_info = new Map();


    for (const node of graph.nodes) {
        node === start ? 
        nodes_info.set(node, [0, null, false]) :
        nodes_info.set(node, [Infinity, null, false]);
    }

    while (visited_count < graph.nodeCount()) {
        const n = getMinDistUnvisitedNode(nodes_info); // [nodeLabel, [dist, pred, visited]]
        const n_info = n[1];

        const neighbors = g.get(n[0]);

        if (neighbors !== undefined) {
            for (const neighbor of neighbors) { // neighbors [nodeLabel, weight]

                const neighbor_info = nodes_info.get(neighbor[0]);
                const combined_cost = n_info[0] + neighbor[1];

                if (combined_cost < neighbor_info[0]) {
                    neighbor_info[0] = combined_cost;
                    neighbor_info[1] = n[0];
                }
            }
        }

        n_info[2] = true;
        visited_count++;

        // TODO: remove - for testing purposes only
        /* console.log("nodes visited: ", visited_count);
        for (const n of [...nodes_info]) {
            console.log(`${n[0]} : [${n[1][0]}, ${n[1][1]}, ${n[1][2]}]`);
        } */
    }

    return returnShortestPath(nodes_info, end);
}

/**
 * Returns the node with the minimum distance
 * @param {*} map 
 * @returns [nodeLabel, [dist, pred, visited]]
 */
function getMinDistUnvisitedNode(map) {

    const m = [...map];
    
    let min = Infinity;
    let min_node = m[0];

    for (let i = 0; i < m.length; i++) {
        const cur = m[i];
        if (cur[1][2] === false && cur[1][0] < min) {
            min = cur[1][0];
            min_node = cur;
        }
    }

    return min_node
}

function returnShortestPath(node_info, end) {
    const path = [end];

    let cur_node = node_info.get(end);

    while (cur_node[1] !== null) {
        path.push(cur_node[1]);
        cur_node = node_info.get(cur_node[1]);
    }

    return path.reverse();
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
ud
w
A,B,1
A,C,4
A,F,25
B,D,19
B,E,14
B,C,2
B,G,6
C,E,8
C,H,3
D,G,7
D,E,9
D,F,5
E,F,12
E,G,2
G,H,2
`;


/* `   
d
w
A,B,7
A,C,4
A,D,13
B,D,1
C,D,5
` */

const g = new Graph(csv);
console.log(g);

Dijkstra(g, g.nodes[6]);
console.log(DijkstraSearch(g, g.nodes[6], g.nodes[0]));

}