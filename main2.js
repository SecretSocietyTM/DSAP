import { Box } from "./util/Box.js";
import { Group } from "./util/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

const objects = [];


// row 1
const b1 = new Box(395, 95, 100, 100);
const b2 = new Box(500, 95, 100, 100);
const b3 = new Box(605, 95, 100, 100);

const b4 = new Box(395, 200, 100, 100);
const b6 = new Box(605, 200, 100, 100);

const b5 = new Box(500, 200, 100, 100);
b5.fill_color = "gray";
b5.use_text = true;
b5.text = "1";
b5.draw_type = 1;
b5.stroke_width = 5;

const t1 = new Box(500, 200, 100, 100);
t1.fill_color = "rgba(0, 255, 150, 0.6)";
t1.selectable = false;

console.log("b5 (target)", b5);
console.log("t1 (expected)", t1.rect);

// TODO: below is needed to allow interaction
objects.push(
    b1,b2,b3,
    b4,b5,b6,
    t1
);
objects.forEach(object => object.draw(ctx));


document.body.addEventListener("click", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.selectable && object.intersects(point)) {
            console.log(object);
            return;
        }
    });
});