export class Graph {
    constructor(edgelist_csv) {

        // given as adjacency list
        this.graph = graphFromCSV(edgelist_csv);
    }

    static print(graph) {
        printGraph(graph);
    } 
}

function graphFromCSV(csv) {

    const graph = new Map();

    const buf = csv.split("\n");

    const header = buf[0];

    for (let i = 1; i < buf.length - 1; i++) {

        const vals = buf[i].split(",");
        const u_node = vals[0];
        const v_node = vals[1];
        const weight = (vals.length !== 3) ? 1 : vals[2]; // unweighted : weighted
        
        pushEdge(graph, u_node, [v_node, weight]);

        if (header === "undirected") {
            pushEdge(graph, v_node, [u_node, weight]);
        }
    }

    return graph;
}

function pushEdge(map, key, value) {
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(value);
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

const csv = 
`directed
A,B
A,C
B,C
`

const g = new Graph(csv);
console.log(g);
Graph.print(g);