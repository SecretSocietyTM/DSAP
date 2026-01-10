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

BST.print(bst);

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







/* TODO: possibly delete */
class DrawBST {
    constructor(bst) {
        this.bst = bst;
    }

    drawBST() {

        const temp = [];

        const width = 60;
        const height = 60;

        const root = new Box(canvas.width / 2 - width / 2, 50, width, height);
        root.fill_color = "white";
        root.stroke_color = "black";
        root.use_text = true;
        root.text = this.bst.root.value;
        root.draw_type = 1;
        root.stroke_width = 3;

        temp.push(root);

        
    }

    recursiveDraw(node) {
        
    }
}

const tst_bst = new BST();
tst_bst.insert(18);
tst_bst.insert(78);
tst_bst.insert(60);
tst_bst.insert(36);
tst_bst.insert(91);
tst_bst.insert(76);
tst_bst.insert(73);

const test = new DrawBST(tst_bst);
test.drawBST();