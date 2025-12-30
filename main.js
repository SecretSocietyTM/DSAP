import { Box } from "./util/Box.js";
import { Group } from "./util/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

const objects = [];

const b1 = new Box(0, 0, 100, 100);
b1.fill_color = "gray";
b1.draw_type = 1;
b1.use_text = true;
b1.text = "1";

const b2 = new Box(0, 0, 100, 100);
b2.use_text = true;
b2.font_color = "gray";
b2.text = "2";

const b3 = new Box(0, 0, 100, 100);
b3.fill_color = "gray";
b3.draw_type = 1;
b3.use_text = true;
b3.text = "3";


objects.push(b2, b1, b3);
objects.forEach(object => object.draw(ctx));

const row = new Group(200, 600);
row.gap = 5;
row.addChild(b1);
row.addChild(b2);
row.addChild(b3);



row.draw(ctx);

// testing
const test_objects = [];

const b4 = new Box(200, 5, 100, 100);

const st_w = 20;
const div2 = st_w / 2;
const b5 = new Box(305 + div2, 5 + div2, 100 - st_w, 100 - st_w);
b5.draw_type = 1;
b5.stroke_width = st_w;
b5.use_text = true;
b5.font_color = "red";
b5.text = "hello";
console.log("b5 (target)", b5);

const b10 = new Box(410, 5, 100, 100);
b10.selectable = false;

const b6 = new Box(305, 110, 100, 100);

const b7 = new Box(300, 5, 105, 105);
b7.fill_color = "rgba(0, 255, 170, 0.55)";
b7.selectable = false;

const b8 = new Box(305, 5, 100, 100); // expected rect {left: 305, right: 405, top: 5, bottom: 105}
console.log("b8 (expected)", b8.rect);
b8.fill_color = "rgba(255, 0, 0, 0.6)";
b8.selectable = false;

const b9 = new Box(305 + div2, 5 + div2, 100 - st_w, 100 - st_w);
b9.fill_color = "rgba(0, 0, 255, 0.7)";
b9.selectable = false;

test_objects.push(b4, b5, b6, b7, b8, b9, b10);
test_objects.forEach(object => object.draw(ctx));


// TODO: add a "Group" class that allows me to specify how to organize things
// whether in rows or columns, including specifying a gap and whatever else I may need to create the 
// Array and LinkedList visualizations



// event listener

// TODO: study three.js to see how they handle clicks for things in groups (parents of children)
document.body.addEventListener("click", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.intersects(point)) {
            console.log(object);
            return;
        }
    });

    test_objects.forEach(object => {
        if (object.selectable && object.intersects(point)) {
            console.log(object);
            return;
        }
    });
});