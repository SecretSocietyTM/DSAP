import { ArrayList } from "../../ArrayList.js";

import { Renderer } from "../../../twoDraw development/twoDraw/Renderer.js";
import { Box } from "../../../twoDraw development/twoDraw/Box.js"
import { Group } from "../../../twoDraw development/twoDraw/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const renderer = new Renderer(canvas);
renderer.clear("blue");

// 
// setup ArrayList
let array_size = 4;
let fill_size = 2;
const sarr = new ArrayList(array_size);
for(let i = 0; i < fill_size; i++) {
    sarr.append(randInt(0, 100));
}

ArrayList.print(sarr);

//
// setting up visualization
const objects = [];

const row = new Group(400, canvas.height / 2 - 50);
row.gap = 3;
row.border = 3;
row.fill_color = "rgb(50,50,50)";

makeArrayListFromGroup(row, sarr);

objects.push(row);
renderer.clear("blue");
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
        index = +prompt("index", randInt(0, sarr.size));
        sarr.insert(value, index);
        break;

    case "append":

        value = +randInt(0, 100);
        sarr.append(value);
        break;

    case "prepend":
        
        value = +randInt(0, 100);
        sarr.prepend(value);
        break;

    case "removeByIndex":

        index = +prompt("index", randInt(0, sarr.size));
        sarr.removeByIndex(index);
        break;

    case "removeByValue":

        value = +prompt("value", randInt(0, 100));
        sarr.removeByValue(value);
        break;

    case "get":

        index = +prompt("index", randInt(0, sarr.size));
        alert(sarr.get(index));
        break;

    case "set":

        value = +prompt("value", randInt(0, 100));
        index = +prompt("index", randInt(0, sarr.size));
        sarr.set(value, index);

        break;
    
    case "contains":

        value = +prompt("value", randInt(0, 100));
        alert(sarr.contains(value));
        break;

    default:
        return;
    }

    ArrayList.print(sarr);
    makeArrayListFromGroup(row, sarr);

    renderer.clear("blue");
    renderer.render(objects);
});


//
// helper functions
function makeArrayListFromGroup(group, arraylist) {
    group.removeChildren();

    const width = 60;
    const height = 60;

    for (let i = 0; i < arraylist.capacity; i++) {
        const b = new Box(0, 0, width, height);
        b.fill_color = "white";

        if (i <= arraylist.size) {
            b.use_text = true;
            b.text = arraylist.get(i);
        }

        group.addChild(b);
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}