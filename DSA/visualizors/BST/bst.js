import { BST } from "../../BST.js";

import { Renderer } from "../../../twoDraw development/twoDraw/Renderer.js";
import { Box } from "../../../twoDraw development/twoDraw/Box.js"
import { Group } from "../../../twoDraw development/twoDraw/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const renderer = new Renderer(canvas);
renderer.clear("red");

// 
// setup LinkedList
let size = 4;
const bst = new BST();
for (let i = 0; i < size; i++) {
    bst.insert(randInt(0, 100));
}

// TODO: uncomment
/* BST.print(bst); */

//
// setting up visualization
const objects = [];

const row = new Group(400, canvas.height / 2 - 50);
row.gap = 50;

// TODO: uncomment, need to fix function
/* makeBSTFromGroup(row, linkedlist); */

objects.push(row);
renderer.clear("red");
renderer.render(objects);


//
// button interaction
const menubar = document.getElementById("menubar");

menubar.addEventListener("click", e => {

    const el = e.target;

    let value;

    switch (el.id) {
    case "insert":

        value = +prompt("value", randInt(0, 100));
        bst.insert(value);
        break;

    case "delete":

        value = +prompt("value", randInt(0, 100));
        bst.delete(value);
        break;

    default:
        return;
    }

    BST.print(bst);

    // TODO: uncomment, need to fix function
    /* makeBSTFromGroup(row, bst); */

    renderer.clear("red");
    renderer.render(objects);
});


//
// helper functions

// TODO: need to fix function
function makeBSTFromGroup(group, bst) {
    group.removeChildren();

    const width = 60;
    const height = 60;

    for (let i = 0; i < bst.size; i++) {
        const b = new Box(0, 0, width, height);
        b.fill_color = "white";
        b.stroke_color = "black";
        b.use_text = true;
        b.text = linkedlist.get(i).value;
        b.draw_type = 1;
        b.stroke_width = 3;

        group.addChild(b);
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// DEMO


const bst1 = new BST();
bst1.insert(18);
bst1.insert(78);
bst1.insert(60);
bst1.insert(36);
bst1.insert(91);
bst1.insert(76);

const h = bst1.height();
const levelorder = bst1.levelorder();
console.log(levelorder);
console.log(bst1.height());

let bottom_y = canvas.height - 100;
let left_x = 100;

const e_w = 60;
const e_h = 60;

const objects2 = [];

for (let i = h - 1; i >= 0; i--) {

    const num_nodes = (2**i);
    const start_idx = num_nodes - 1;

    const g = new Group(left_x, bottom_y);
    g.border = 3;
    g.gap = 3;
    g.fill_color = "rgb(50,50,50)";

    for (let j = 0; j < num_nodes; j++) { 
        const b = new Box(0, 0, e_w, e_h);
        b.fill_color = "white";
        b.stroke_color = "black";
        b.use_text = true;
        b.text = levelorder[start_idx + j];
        b.draw_type = 1;
        b.stroke_width = 3;

        const empty = new Box(0,0, e_w, e_h);
        empty.fill_color = "white";
        empty.stroke_color = "black";
        empty.draw_type = 1;
        empty.stroke_width = 3;

        g.addChild(b);

        if (j === num_nodes - 1) break;

        g.addChild(empty);
    }

    bottom_y -= e_h + 6;
    left_x += e_w * (num_nodes / 4) + 6;

    objects2.push(g);
}

renderer.render(objects2);
