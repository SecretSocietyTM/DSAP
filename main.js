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
/* objects.forEach(object => object.draw(ctx)); */

const row = new Group(200, 600);
row.gap = 5;
row.addChild(b1);
row.addChild(b2);
row.addChild(b3);



row.draw(ctx);


// TODO: add a "Group" class that allows me to specify how to organize things
// whether in rows or columns, including specifying a gap and whatever else I may need to create the 
// Array and LinkedList visualizations



// event listener
document.body.addEventListener("click", e => {
    const point = {x: e.clientX, y: e.clientY};

    objects.forEach(object => {
        if (object.intersects(point)) {
            console.log(object);
            return;
        }
    });
});