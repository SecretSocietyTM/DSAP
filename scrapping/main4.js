import { Box } from "./util/Box.js";
import { Group } from "./util/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");



// 
// setting up required objects
const objects = [];

const row = new Group(400, canvas.height / 2 - 50);
row.gap = 3;
row.border = 3;
row.fill_color = "rgb(50,50,50)";

const column = new Group(canvas.width - 300, 50);
column.type = 1;
column.gap = 2;
column.border = 2;
column.fill_color = "rgb(150,150,150)";



//
// setting up visualization

let array_size = 10;
let memory_size = 15;
let last_fill = 4;

// e = element
const e_width = 60;
const e_height = 60;

// m = memory
const m_width = 100;
const m_height = 40;

for (let i = 0; i < array_size; i++) {
    const b = new Box(0, 0, e_width, e_height);
    b.fill_color = "white";
    b.use_text = true;

    if (i < last_fill) {
        b.text = i;
    }

    row.addChild(b);
}

for (let i = 0; i < memory_size; i++) {
    const b = new Box(0, 0, m_width, m_height);
    b.fill_color = "white";
    b.use_text = true;

    if (i < last_fill) {
        b.font_size = 24;
        b.text = i;
    }

    column.addChild(b);
}

row.draw(ctx);
column.draw(ctx);





/* ctx.clearRect(0, 0, canvas.width, canvas.height); */ // TOD: wrap this in a function called "clear()" to use for updating the canvas



//
// event listeners
document.body.addEventListener("click", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.selectable && object.intersects(point)) {
            console.log(object);
            return;
        }
    });
});

/* document.body.addEventListener("mousemove", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.selectable) {
            if (object.intersects(point)) {
                object.fill_color = "red";

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                row.draw(ctx);

                return;
            } else {
                object.fill_color = "gray";

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                row.draw(ctx);

                return;
            }
        }
    });
}); */

document.addEventListener("keypress", e => {
    if (e.key === "w") {

        if (last_fill >= array_size) return;
        
        const b = row.children[last_fill];
        b.use_text = true;
        b.text = last_fill;

        const m = column.children[last_fill];
        m.use_text = true;
        m.text = last_fill;
        m.font_size = 24;

        // not ideal
        b.draw(ctx);
        m.draw(ctx);

        last_fill++

    } else if (e.key === "s") {     // remove the last element in the array

    }
});