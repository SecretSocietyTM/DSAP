/* 
This data structure is trivial, but linked lists have a quality which
at times make them very attractive compared to arrays. 

A linked list is dynamically resized, thus it incurs no copy penalty like an
array would eventually incur given it has reached its static capacity
*/

export class LinkedList {

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
    insert(value, index) {

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

    // O(n) TODO: complete
    removeByIndex(index) {

    }

    // O(n)
    removeByValue(value) {

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

    // TODO: complete
    set(value, index) {

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

    // static methods
    static print(linkedlist) {
        /* printLinkedList(linkedlist); */
        printLinkedList(linkedlist)
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function printLinkedList(linkedlist) {

    const top_bar = " ----    ";
    const bot_bar = " ¯¯¯¯    ";

    let top_string = top_bar.repeat(linkedlist.size);
    let bot_string = bot_bar.repeat(linkedlist.size);

    const space = 4;

    let mid_string = "";
    for (let i = 0; i < linkedlist.size; i++) {

        let value = linkedlist.get(i).value;

        const digits = String(value).length;
        const padding = Math.max(space - digits, 2);

        const str = " ".repeat(padding) + value + "|-->";

        mid_string += "|" + str;
    }

    top_string += " ----";
    mid_string += "|null|";
    bot_string += " ¯¯¯¯";

    let info_string = "";
    if (linkedlist.size <= 1) {
        info_string += " head\n tail";
    } else {
        info_string += " head" + " ".repeat(9 * (linkedlist.size - 1) - 4) + "tail";
    }

    console.log
    (
        info_string + "\n" +
        top_string  + "\n" +
        mid_string  + "\n" +
        bot_string  + "\n"
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

            console.log("appending ", r);
            linkedlist.append(r);
            LinkedList.print(linkedlist);
        } else if (e.key === "s") {

            let r;

            if (node_values.length !== 0) {
                const idx = randInt(0, node_values.length - 1);
                r = node_values[idx];

                node_values.splice(idx, 1);
            } else {
                r = randInt(10, 99);
            }

            console.log("removing first occurance of", r);
            linkedlist.removeByValue(r);
            LinkedList.print(linkedlist);
        }
    });
}