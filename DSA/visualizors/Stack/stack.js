import { Stack } from "../../Stack.js";

import { Renderer } from "../../../twoDraw development/twoDraw/Renderer.js";
import { Box } from "../../../twoDraw development/twoDraw/Box.js"
import { Group } from "../../../twoDraw development/twoDraw/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const renderer = new Renderer(canvas);
renderer.clear("teal");

//
// set up Stack
let stack_size = 3;
const stack = new Stack();
for (let i = 0; i < stack_size; i++){
    stack.push(randInt(0, 100));
}

Stack.print(stack);

//
// setting up visualization
const objects = [];

const col = new Group(canvas.width / 2 - 20, 100);
col.type = 1;
col.gap = 3;
col.border = 3;
col.fill_color = "rgb(50,50,50)";

makeStackFromGroup(col, stack);

objects.push(col);
renderer.clear("teal");
renderer.render(objects);


//
// button interaction
const menubar = document.getElementById("menubar");

menubar.addEventListener("click", e => {

    const el = e.target;

    let value;

    switch (el.id) {
    case "push":

        value = +prompt("value", randInt(0, 100));
        stack.push(value);
        break;

    case "pop":

        stack.pop();
        break;

    case "peek":
        
        alert("Value: " + stack.peek().value);
        break;

    default:
        return;
    }

    Stack.print(stack);
    makeStackFromGroup(col, stack);

    renderer.clear("teal");
    renderer.render(objects);
});


//
// helper functions
function makeStackFromGroup(group, stack) {
    stack = stack.stack;

    group.removeChildren();

    const width = 60;
    const height = 60;

    for (let i = 0; i < stack.size; i++) {
        const b = new Box(0, 0, width, height);
        b.fill_color = "white";
        b.stroke_color = "black";
        b.use_text = true;
        b.text = stack.get(i).value;
        b.draw_type = 1;
        b.stroke_width = 3;

        /* 
        TODO: going to need to "reverse" the direction
        that groups can "grow"
        */

        group.addChild(b);
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}