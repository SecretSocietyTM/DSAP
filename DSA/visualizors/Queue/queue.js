import { Queue } from "../../Queue.js";

import { Renderer } from "../../../twoDraw development/twoDraw/Renderer.js";
import { Box } from "../../../twoDraw development/twoDraw/Box.js"
import { Group } from "../../../twoDraw development/twoDraw/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const renderer = new Renderer(canvas);
renderer.clear("mediumseagreen");

//
// set up Stack
let queue_size = 5;
const queue = new Queue();
for (let i = 0; i < queue_size; i++){
    queue.enqueue(randInt(0, 100));
}

Queue.print(queue);

//
// setting up visualization
const objects = [];

const row = new Group(500, canvas.height / 2 - 50);
row.gap = 3;
row.border = 3;
row.fill_color = "rgb(50,50,50)";

makeQueueFromGroup(row, queue);

objects.push(row);
renderer.clear("mediumseagreen");
renderer.render(objects);


//
// button interaction
const menubar = document.getElementById("menubar");

menubar.addEventListener("click", e => {

    const el = e.target;

    let value;

    switch (el.id) {
    case "enqueue":

        value = +prompt("value", randInt(0, 100));
        queue.enqueue(value);
        break;

    case "dequeue":

        queue.dequeue();
        break;

    case "peek":
        
        alert("Value: " + queue.peek().value);
        break;

    default:
        return;
    }

    Queue.print(queue);
    makeQueueFromGroup(row, queue);

    renderer.clear("mediumseagreen");
    renderer.render(objects);
});


//
// helper functions
function makeQueueFromGroup(group, queue) {
    queue = queue.queue;

    group.removeChildren();

    const width = 60;
    const height = 60;

    for (let i = 0; i < queue.size; i++) {
        const b = new Box(0, 0, width, height);
        b.fill_color = "white";
        b.stroke_color = "black";
        b.use_text = true;
        b.text = queue.get(i).value;
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