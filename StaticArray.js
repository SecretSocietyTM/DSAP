class StaticArray {
    constructor(size) {

        this.arr = new Array(size).fill(null);

        this.len = size;
        this.len_filled = 0;
    }

    // O(1)
    insert(value, i) {

        if (i < 0 || i > len) throw new Error("Index i out of bounds");

        this.arr[i] = value;
        this.len_filled++;
    }

    // O(1)
    append(value) {

        if (this.len_filled === this.len) throw new Error("StaticArray at max capacity");

        this.arr[this.len_filled] = value;
        this.len_filled++;
    }

    // O(n) TODO: complete
    contains(value) {

    }

    // O(1)
    removeAt(index) {

        if (index < 0 || index >= this.len) throw new Error("Index i out of bounds");

        const temp = this.arr[index];
        this.arr[index] = null;

        return temp;
    }

    // O(n) TODO: complete
    remove(value) {

    }

    // O(1)
    get(index) {

        if (index < 0 || index >= this.len) throw new Error("Index i out of bounds");

        return this.arr[index];
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// TODO: complete
/* function printLinkedList(list) {

    let cur_node = list.head;

    if (list.head === null) {
        printNode(cur_node, "head / tail");
        console.log(" \n \n");
        return;
    }

    let next_node = cur_node.next;

    if (list.head === list.tail) {
        printNode(cur_node, "head / tail");
        printNode(next_node, "");
        console.log(" \n \n");
        return;
    }

    printNode(cur_node, "head");

    cur_node = cur_node.next;

    for (let i = 0; i < 5; i++) {

        next_node = cur_node.next;

        if (next_node === null) break;

        printNode(cur_node, "");

        cur_node = cur_node.next;
    }

    printNode(cur_node, "tail");
    printNode(next_node, "");

    console.log(" \n \n");
}

function printNode(node, type) {

    if (node === null) {
        console.log(`| null|   ${type}\n`);
        return;
    }

    console.log
    (
        "-------\n" +
        `|   ${node.value}|   ${type}\n` +
        "-------\n" +
        "   V   "
    );
}

// helper
const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// event listener
const l1 = new LinkedList();
const node_values = [];

document.addEventListener("keypress", e => {
    if (e.key === "w") {

        const r = randInt(10, 99);
        node_values.push(r);

        console.log("inserting ", r);
        l1.append(r);
        printLinkedList(l1);
    } else if (e.key === "s") {

        let r;

        if (node_values.length !== 0) {
            const idx = randInt(0, node_values.length - 1);
            r = node_values[idx];

            node_values.splice(idx, 1);
        } else {
            r = randInt(10, 99);
        }

        console.log("removing ", r);
        l1.remove(r);
        printLinkedList(l1);
    }
}); */