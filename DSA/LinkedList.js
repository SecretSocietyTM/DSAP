/* 
This data structure is trivial, but linked lists have a quality which
at times make them very attractive compared to arrays. 

A linked list is dynamically resized, thus it incurs no copy penalty like an
array would eventually incur given it has reached its static capacity
*/

class LinkedList {

    Node = class {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    };

    constructor() {

        this.head = null;
        this.tail = this.head;
        this.size = 0;
    }

    // O(n) TODO: complete
    insert(value, i) {

    }

    // O(1)
    append(value) {
        const node = new this.Node(value);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }

    // O(n)
    contains(value) {
        let node = this.head;

        while (node !== null) {

            if (node.value === value) {
                return true;
            };

            node = node.next;
        }

        return false;
    }

    // O(n) TODO: complete
    removeAt(index) {

    }

    // O(n)
    remove(value) {

        if (this.head === null) return;

        // 2) only element is being removed
        if (this.head === this.tail && this.head.value === value) {
            this.head = null;
            this.head = null;

        // 3) head is being removed
        } else if (this.head.value === value) {
            this.head = this.head.next;

        } else {
            let cur = this.head;
            let next = cur.next;

            while (next !== null && next.value !== value) {
                cur = next;
                next = next.next;
            }

            // reached the end of list (or next contains the value)
            if (next !== null) {

                // 5) other is being removed
                cur.next = next.next;

                // 4) tail is being removed
                if (next === this.tail) {
                    this.tail = cur;
                }
            }
        }
        
        this.size--;
        // 1) empty list
        // 6) no node exists
    }

    // O(n)
    get(index) {

        if (index < 0 || index >= this.len) throw new Error("Index i out of bounds");

        let cur = this.head;

        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }

        return cur;
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function printLinkedList(list) {

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

if (true) {

    // helper
    const randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const linkedlist = new LinkedList();
    const node_values = [];

    document.addEventListener("keypress", e => {
        if (e.key === "w") {

            const r = randInt(10, 99);
            node_values.push(r);

            console.log("inserting ", r);
            linkedlist.append(r);
            printLinkedList(linkedlist);
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
            linkedlist.remove(r);
            printLinkedList(linkedlist);
        }
    });
}