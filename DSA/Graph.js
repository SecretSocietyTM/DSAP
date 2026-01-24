export class Graph {
    constructor(edgelist_csv) {

        // given as adjacency list
        this.graph = graphFromCSV(edgelist_csv); // u : [[v, weight], ...], x : [[y, weight]]
        this.nodes = getNodes(this.graph);               // 
    }

    nodeCount() {
        return this.nodes.size;
    }

    static print(graph) {
        printGraph(graph);
    } 
}

function graphFromCSV(csv) {

    const graph = new Map();

    const buf = csv.split("\n");


    // file starts at buf[1], buf[0] is ""
    const header1 = buf[1]; // directed | undirected
    const header2 = buf[2]; // weighted | unweighted

    for (let i = 3; i < buf.length - 1; i++) {

        const vals = buf[i].split(",");
        const u_node = vals[0];
        const v_node = vals[1];
        let weight;

        if (header2 === "w" && vals.length === 3) {
            weight = vals[2];
        } else {
            weight = 1;
        }
        
        pushEdge(graph, u_node, [v_node, weight]);

        if (header1 === "ud") {
            pushEdge(graph, v_node, [u_node, weight]);
        }
    }

    return graph;
}

function pushEdge(map, key, value) {
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(value);
}

function getNodes(graph) {

    const nodes = new Set();

    graph.forEach((value, key) => {
        nodes.add(key);
        for (const pair of value) {
            nodes.add(pair[0]);
        }
    });
    
    return [...nodes];
}

function printGraph(graph) {

    const g = graph.graph;
    
    let str = "";

    g.forEach((value, key) => {
        str += key + ": [";
        for (const pair of value) {
            str += `(${pair[0]},${pair[1]})`
        }
        str += "]\n";
    });

    console.log(str);
}

//////////////////// TESTING ////////////////////

// flags for csv
// w = weighted | uw = unweighted
// d = directed | ud = undirected

if (false)
{
const csv = 
`
d
w
A,B
A,C
B,C
`

const g = new Graph(csv);
console.log(g);
Graph.print(g);

console.log(g.nodeCount());
}