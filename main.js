import { Square } from "./util/Square.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

const objects = [];

const square = new Square(canvas.width / 2, canvas.height / 2, 100, 100);
square.fill_color = "gray";
square.use_text = true;
square.text = "testing";

const square2 = new Square(canvas.width / 2 + 100, canvas.height / 2, 100, 100);
square2.use_text = true;
square2.font_color = "gray";
square2.text = "testing";

objects.push(square, square2);

objects.forEach(object => object.draw(ctx));