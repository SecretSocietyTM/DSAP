import { LinkedList } from "./LinkedList.js";

export class Stack {
    constructor() {

        // TODO: make private?
        this.stack = new LinkedList();
    }

    push(value) {
        this.stack.prepend(value);
    }

    pop() {
        this.stack.removeByIndex(0);
    }

    peek() {
        this.stack.get(0);
    }

    isEmpty() {

        if (this.stack.size === 0) return true;

        return false;
    }

    static print(stack) {
        printStack(stack);
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function printStack(stack) {

    const values = [];
    for (let i = 0; i < stack.stack.size; i++) {
        const node = stack.stack.get(i);
        values.push(node.value);
    }

    values.reverse();

    if (stack.stack.size === 0) {
        console.log("empty stack");
        return;
    }

    const top_bar = "-----";
    const bot_bar = "¯¯¯¯¯";

    let top_string = top_bar.repeat(stack.stack.size);
    let bot_string = bot_bar.repeat(stack.stack.size);

    const space = 4;

    let mid_string = ""
    for (let value of values) {
        const digits = String(value).length;
        const padding = Math.max(space - digits, 2);
        const str = "|" + " ".repeat(padding) + value;

        mid_string += str;
    }

    top_string += "-"
    mid_string += "| <-- top";
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

    const stack = new Stack();

    document.addEventListener("keypress", e => {
        if (e.key === "w") {

            const r = randInt(10, 99);

            console.log("pushing ", r);
            stack.push(r);
            Stack.print(stack);
        } else if (e.key === "s") {

            console.log("popping");
            stack.pop();
            Stack.print(stack);
        }
    });
}