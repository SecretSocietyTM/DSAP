import { Box } from "../../twoDraw/Box.js";
import { Group } from "../../twoDraw/Group.js";
import { Renderer } from "../../twoDraw/Renderer.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

console.log(canvas.getBoundingClientRect());

const renderer = new Renderer(canvas);
renderer.clear("green");

const objects = [];

const b1 = new Box(50, 50, 100, 100);
b1.use_text = true;
b1.text = "b1";
b1.font_color = "white";

const b2 = new Box(270, 50, 100, 100);
b2.use_text = true;
b2.text = "b2";
b2.font_color = "red";

/* 
TODO: fix the font placement.
If I use pivot_point: center, the font does not 
follow. The reason for this is because I create 
the illusion of a center pivot by just subtracting
half of the box's w/h from the x,y coords right before
drawing.

Ideally I don't take this approach but if I remember
correctly, I did this because of how complex some things
would get regarding using a stroke over a fill.

There are two options, implement the previous version which
is more complex but also feels more "correct" as the object's
x and y positions are more accurately reflected.

Option 2 is to just update the text the same way, right before
it is drawn.
*/
const b3 = new Box(210, 100, 100, 100);
b3.use_text = true;
b3.text = "b3";
b3.pivot_point = 1;

objects.push(b1, b2, b3);
renderer.render(objects);

