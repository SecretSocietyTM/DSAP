import { Object2D } from "./Object2D.js";

const DRAW_TYPE = {FILL: 0, STROKE: 1};
const PIVOT_POINT = {TOPLEFT: 0, CENTER: 1};

const objectChange_event = {type: "objectChange"};

export class Box extends Object2D {
    constructor({
        x, 
        y, 
        width, 
        height,
        draw_type,
        pivot_point,
        stroke_width,
        fill_color,
        stroke_color,
        use_text,
        text,
        font_weight,
        font_size,
        font_face,
        font_color
    } = {}) {
        super();

        defineProperty(this, "x", x ?? 0);
        defineProperty(this, "y", y ?? 0);
        defineProperty(this, "width", width ?? 100);
        defineProperty(this, "height", height ?? 100);

        defineProperty(this, "draw_type", draw_type ?? DRAW_TYPE.FILL);
        defineProperty(this, "pivot_point", pivot_point ?? PIVOT_POINT.TOPLEFT);

        defineProperty(this, "stroke_width", stroke_width ?? 1);

        this.fill_color = fill_color ?? "black";
        this.stroke_color = stroke_color ?? "black";

        this.use_text =   use_text ?? false;
        this.text = text ?? null;
        this.font_weight = font_weight ?? "normal";
        this.font_size = font_size ?? 16;
        this.font_face = font_face ?? "serif";
        this.font_color = font_color ?? "black";

        // event listeners
    }

    draw(ctx) {
        switch (this.draw_type) {
        case DRAW_TYPE.FILL:

            this.fill(ctx);
            break;

        case DRAW_TYPE.STROKE:

            this.stroke(ctx)
            break;
        
        default:
            throw new Error("The Box object's draw_type is not a valid value");
        }

        if (this.use_text) this.fillText(ctx);
    }

    fill(ctx) {
        ctx.fillStyle = this.fill_color;

        if (this.pivot_point === PIVOT_POINT.CENTER) {
            ctx.fillRect(
                this.x - (this.width / 2),
                this.y - (this.height / 2),
                this.width,
                this.height
            );
        } else {
            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

    }

    stroke(ctx) {
        this.fill(ctx);

        const sw = this.stroke_width;

        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = sw;

        ctx.strokeRect(
            this.x + (sw / 2),
            this.y + (sw / 2),
            this.width - sw,
            this.height - sw
        );
    }

    fillText(ctx) {
        
        if (ctx.measureText(this.text).width > this.width) return;

        ctx.font = `${this.font_weight} ${this.font_size}px ${this.font_face}`;

        const center = {
            x: this.x
        }
    }
}

function defineProperty(scope, property_name, default_value) {

    let property_value = default_value;

    Object.defineProperty(scope, property_name, {

        get: function() {
            return property_value
        },

        set: function(value) {
            if (property_value !== value) {
                property_value = value;
            }

            // TODO: reintroduce if event listeners are needed.
            /* scope.dispatchEvent(objectChange_event); */
        }
    })
}

