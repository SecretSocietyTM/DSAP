import { Box } from "./util/Box.js";
import { Group } from "./util/Group.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

const objects = [];


// row 1
const b1 = new Box(395, 95, 100, 100);
b1.text = "b1";
b1.use_text = true;
b1.font_color = "white";

const b2 = new Box(500, 95, 100, 100);
b2.text = "b2";
b2.use_text = true;
b2.font_color = "white";

const b3 = new Box(500, 200, 100, 100);
b3.fill_color = "gray";
b3.use_text = true;
b3.text = "b3";
b3.draw_type = 1;
b3.stroke_width = 6;

const b4 = new Box(0, 0, 100, 100);
b4.fill_color = "gray";
b4.use_text = true;
b4.text = "b4";
b4.draw_type = 1;
b4.stroke_width = 6;

// TODO: below is needed to allow interaction
objects.push(
    b1,b2, b3, b4
);

const row = new Group(canvas.width / 2, canvas.height / 2);
row.gap = 0;
row.addChild(b2);
row.addChild(b1);
row.addChild(b3);
row.addChild(b4);

row.draw(ctx);


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



// test
const t1 = new Box(500, 200, 100, 100);
t1.stroke_color = "orange";
t1.use_text = true;
t1.text = "b4";
t1.draw_type = 1;
t1.stroke_width = 10;
t1.draw(ctx);

const t2 = new Box(590, 200, 100, 100);
t2.stroke_color = "orange";
t2.use_text = true;
t2.text = "b4";
t2.draw_type = 1;
t2.stroke_width = 10;
t2.draw(ctx);