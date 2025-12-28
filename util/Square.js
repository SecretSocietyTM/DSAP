import { Object2D } from "./Object2D.js";

export class Square extends Object2D {
    constructor(x, y, width, height) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // needs to be updated dynamically whenever any of the above change
        this.rect = {
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
        };

        // default values that can be overwritten
        this.draw_type = 0 // 0 = fill, 1 = stroke
        this.fill_color = "black";

        this.stroke_color = "black";
        this.stroke_width = 5; // TODO: figure out a way to alter the x/y/width/height to adjust for use of strokes. 
        // It can be a setting but for now I do not like that the stroke increases the width/height of the object

        // TODO: temp solution for text on the boxes
        this.text = null;
        this.font_weight = "normal";
        this.font_size = 36;
        this.font_face = "serif";
        this.font_color = "black";
        this.use_text = false;
    }

    draw(ctx) {
        switch (this.draw_type) {
        case 0:
            this.fill(ctx);
            break;
        case 1:
            this.stroke(ctx);
            break;
        default: 
            throw new Error("Square object does not have correct draw_type value. Set to either 0 or 1.");
        }

        if (this.use_text && this.text !== null) {
            this.fillText(ctx);
        }
    }

    fill(ctx) {
        ctx.fillStyle = this.fill_color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    stroke(ctx) {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = this.stroke_width;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    fillText(ctx) {
        // Hard code at center of object. 
        // If text does not fit within the object, do not add it.
        ctx.font = `${this.font_weight} ${this.font_size}px ${this.font_face}`;

        if (ctx.measureText(this.text).width > this.width) return;

        const center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };

        console.log("center", center);

        ctx.fillStyle = this.font_color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, center.x, center.y, this.width);
    }

    intersects(p) {
        const rect = this.rect;

        if (p.x > rect.left && p.x < rect.right &&
            p.y > rect.top && p.y < rect.bottom) {
            return true;
        }

        return false;
    }
}