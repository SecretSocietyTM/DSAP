import { LinkedList } from "./LinkedList.js";

export class Queue {
    constructor() {

        // TODO: make private?
        this.queue = new LinkedList();
    }

    enqueue(value) {
        this.queue.append(value);
    }

    dequeue() {
        this.queue.removeByIndex(0);
    }

    peek() {
        return this.queue.get(0);
    }
    
    isEmpty() {

        if (this.queue.size === 0) return true;

        return false;
    }

    static print(queue) {
        printQueue(queue);
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function printQueue(queue) {

    if (queue.queue.size === 0) {
        console.log("empty queue");
        return;
    }

    const top_bar = "-----";
    const bot_bar = "¯¯¯¯¯";

    let top_string = " ".repeat(10) + top_bar.repeat(queue.queue.size);
    let bot_string = " ".repeat(10) + bot_bar.repeat(queue.queue.size);

    const space = 4;

    let mid_string = "start --> "
    for (let i = 0; i < queue.queue.size; i++) {

        let value = queue.queue.get(i).value;

        const digits = String(value).length;
        const padding = Math.max(space - digits, 2);

        const str = "|" + " ".repeat(padding) + value;

        mid_string += str;
    }

    top_string += "-"
    mid_string += "|";
    bot_string += "¯"

    console.log
    (
        top_string + "\n" +
        mid_string + "\n" +
        bot_string + "\n"
    );
}

if (true) {

    // helper
    const randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const queue = new Queue();

    document.addEventListener("keypress", e => {
        if (e.key === "w") {

            const r = randInt(10, 99);

            console.log("enqueuing ", r);
            queue.enqueue(r);
            Queue.print(queue);
        } else if (e.key === "s") {

            console.log("dequeuing");
            queue.dequeue();
            Queue.print(queue);
        }
    });
}