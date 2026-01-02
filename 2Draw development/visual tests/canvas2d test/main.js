const canvas = document.getElementById("canvas");
displayCanvasInfo(canvas);

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
displayCanvasInfo(canvas);

const ctx = canvas.getContext("2d");
console.log(ctx);

// draws a tiny square filled with black
ctx.fillRect(30, 30, 10, 10);

// draws a tiny square with a black outline 2px wide
ctx.lineWidth = 2;
ctx.strokeRect(50, 50, 10, 10);

// draws a 500x500 black square and stamps out a 100x100 square
ctx.fillRect(100, 100, 500, 500);
ctx.clearRect(150, 150, 100, 100);

// draws regular looking text
ctx.fillText("hello", 1000, 500, 100);

// not sure what this could be used for, at this scale it just looks bad
ctx.lineWidth = 1;
ctx.strokeText("hello", 1200, 500, 100);

// returns useful information for the 4th argument to the above functions
console.log(ctx.measureText("hello"));


// about all that is needed to begin working on DSAP stuff

// the fill color (why is it called style instead of color?)
ctx.fillStyle = "red";
ctx.fillRect(1200, 200, 40, 40);

ctx.strokeStyle = "orange";
ctx.lineWidth = 5;
ctx.strokeRect(1000, 50, 500, 200);






ctx.fillStyle = "orange";
ctx.fillRect(0, 0, canvas.clientWidth / 2, canvas.clientHeight);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight / 2);

ctx.fillStyle = "red";
ctx.font = "30px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("hello", canvas.clientWidth / 2, canvas.clientHeight / 2, 500);



function displayCanvasInfo(c) {
    console.log("client width / height:", c.clientWidth, " | ", c.clientHeight);
    console.log("width / height:", c.width, " | ", c.height, "\n ");
}



/* For future note:
clientWidth / clientHeight determines how the canvas element appears on screen
width / height determines how many pixel are being rendered to.

These two are not kept in sync. The clientWidth/clientHeight is determined by CSS
rules and these values are not immediately applied to the canvas itself.

Additionally a canvas' width/height are unique properties not generally provided
to other HTML elements (I believe). Which is why you can do
canvas.width = 100
 */