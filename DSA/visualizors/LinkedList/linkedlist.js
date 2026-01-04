import { LinkedList } from "../../LinkedList.js";

import { Renderer } from "../../../twoDraw development/twoDraw/Renderer.js";
import { Box } from "../../../twoDraw development/twoDraw/Box.js"
import { Group } from "../../../twoDraw development/twoDraw/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const renderer = new Renderer(canvas);
renderer.clear("orange");

// 
// setup LinkedList
let linkedlist_size = 4;
const linkedlist = new LinkedList();
for (let i = 0; i < linkedlist_size; i++) {
    linkedlist.append(randInt(0, 100));
}

LinkedList.print(linkedlist);

//
// setting up visualization
const objects = [];

const row = new Group(400, canvas.height / 2 - 50);
row.gap = 50;

makeLinkedListFromGroup(row, linkedlist);

objects.push(row);
renderer.clear("orange");
renderer.render(objects);


//
// button interaction
const menubar = document.getElementById("menubar");

menubar.addEventListener("click", e => {

    const el = e.target;

    let value;
    let index;

    switch (el.id) {
    case "insert":

        value = +prompt("value", randInt(0, 100));
        index = +prompt("index", randInt(0, linkedlist.size));
        linkedlist.insert(value, index);
        break;

    case "append":

        value = +randInt(0, 100);
        linkedlist.append(value);
        break;

    case "prepend":
        
        value = +randInt(0, 100);
        linkedlist.prepend(value);
        break;

    case "removeByIndex":

        index = +prompt("index", randInt(0, linkedlist.size));
        linkedlist.removeByIndex(index);
        break;

    case "removeByValue":

        value = +prompt("value", randInt(0, 100));
        linkedlist.removeByValue(value);
        break;

    case "get":

        index = +prompt("index", randInt(0, linkedlist.size));
        alert(linkedlist.get(index));
        break;

    case "set":

        value = +prompt("value", randInt(0, 100));
        index = +prompt("index", randInt(0, linkedlist.size));
        linkedlist.set(value, index);

        break;
    
    case "contains":

        value = +prompt("value", randInt(0, 100));
        alert(linkedlist.contains(value));
        break;

    default:
        return;
    }

    LinkedList.print(linkedlist);
    makeLinkedListFromGroup(row, linkedlist);

    renderer.clear("orange");
    renderer.render(objects);
});


//
// helper functions
function makeLinkedListFromGroup(group, linkedlist) {
    group.removeChildren();

    const width = 60;
    const height = 60;

    for (let i = 0; i < linkedlist.size; i++) {
        const b = new Box(0, 0, width, height);
        b.fill_color = "white";
        b.stroke_color = "black";
        b.use_text = true;
        b.text = linkedlist.get(i).value;
        b.draw_type = 1;
        b.stroke_width = 3;

        /* 
        TODO: since the LinkedList is basically like the Arraylist (visually) 
        I'm going to leave it as is.

        After I've made good progress on Trees Ill update twoDraw to support
        text aligned to some point, lines/arrows, and circles.
        */

        group.addChild(b);
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}