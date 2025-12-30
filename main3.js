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

const t1 = new Box(canvas.width / 2 + (2 * 100) + (2 * 5), canvas.height / 2 - 105, 100, 100);
t1.use_text = true;
t1.text = "t1";
t1.font_color = "yellow"
t1.draw(ctx);

const t11 = new Box(canvas.width / 2 + (3 * 100) + (3 * 5), canvas.height / 2 - 105, 100, 150);
t11.fill_color = "rgba(0, 255, 150, 0.6)";
t11.use_text = true;
t11.text = "t11";
t11.font_color = "yellow"
t11.draw(ctx);

const t2 = new Box(canvas.width / 2 + (3 * 100) + (2 * 5), canvas.height / 2, 100, 200);
t2.use_text = true;
t2.text = "t2";
t2.font_color = "yellow"
/* t2.draw(ctx); */

const t3 = new Box(canvas.width / 2 + (2 * 100) + (2 * 5), canvas.height / 2 - 25, 100, 150)
t3.fill_color = "rgba(0, 255, 150, 0.6)";
t3.draw(ctx);

// TODO: below is needed to allow interaction
objects.push(
    b1,b2
);

const row = new Group(canvas.width / 2, canvas.height / 2);
row.gap = 5;
row.addChild(b2);
row.addChild(b1);
row.addChild(b3);
row.addChild(b4);

// NOTES:
// Boxes drawn with FILL will have their x/y offset === 0
// Boxes drawn with STROKE will have their x/y offset === stroke_width / 2
// perhaps instead of recalculating the x/y values the offset could be added
// same thing for the w/h values. Perhaps this can be done right before rendering


b3.x += b3.stroke_width / 2;
b3.y += b3.stroke_width / 2;

// TODO: uh oh... there might be some problems with decimal numbers... nevermind? 6 / 2 = 3 which is a whole number
// this still produces the single missing pixel. if this is the case for all instances of 
/* b3.width += 1; */


// TODO: seems that I need to add 1 to each thing? Even 
b4.x += b4.stroke_width / 2 + b3.stroke_width + 1;
b4.y += b4.stroke_width / 2;

console.log(b3);

row.draw(ctx);


document.body.addEventListener("click", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.selectable && object.intersects(point)) {
            console.log(object);
            return;
        }
    });
});