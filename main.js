import { Square } from "./util/Square.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

const objects = [];

const square = new Square(canvas.width / 2, canvas.height / 2, 100, 100);
square.fill_color = "gray";
square.draw_type = 1;
square.use_text = true;
square.text = "testing";

const square2 = new Square(canvas.width / 2 + 100, canvas.height / 2, 100, 100);
square2.use_text = true;
square2.font_color = "gray";
square2.text = "testing";

objects.push(square, square2);

objects.forEach(object => object.draw(ctx));



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