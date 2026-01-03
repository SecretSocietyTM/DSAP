export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");


    }

    /**
     * 
     * @param {*} color - a css valid color value as a string
     */
    clear(color) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(objects) {
        objects.forEach(object => object.draw(this.ctx));
    }
}