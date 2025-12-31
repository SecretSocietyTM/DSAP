import { Object2D } from "./Object2D.js";

const DRAW_TYPE = {FILL: 0, STROKE: 1};

const objectChange_event = {type: "objectChange"};

export class Box extends Object2D {
    constructor(x = 0, y = 0, width, height) {
        super();

        defineProperty(this, "x", x); // Example arrow function setting dirty flag {s => s._dirty.rect = true}
        defineProperty(this, "y", y);
        defineProperty(this, "width", width);
        defineProperty(this, "height", height);

        defineProperty(this, "draw_type", DRAW_TYPE.FILL);
        defineProperty(this, "stroke_width", 1);

        this.rect = updateRect(this);

        // box draw settings
        this.fill_color = "black";
        this.stroke_color = "black";

        // text draw settings
        this.text = null;
        this.font_weight = "normal";
        this.font_size = 36;
        this.font_face = "serif";
        this.font_color = "black";
        this.use_text = false;

        this.selectable = true;

        //
        // flags
        this.updating = false;

        this._dirty = {
            rect: false,
        };

        //
        // event listeners
        this.addEventListener(objectChange_event.type, () => {
            this.update();
        });
    }

    // NOTE: keeping this in case I want to use it in the future.
    update() {

        this.updating = true;

        // NOTE: old implementation had a check for the dirty flag
        // since there were more than 1 flag
        /* if (this._dirty.rect) */ 

        this.rect = updateRect(this);

        this.updating = false;
        this._dirty.rect = false;
    }

    draw(ctx) {
        switch (this.draw_type) {
        case DRAW_TYPE.FILL:
            this.fill(ctx);
            break;
        case DRAW_TYPE.STROKE:
            this.stroke(ctx);
            break;
        default: 
            throw new Error("Box object does not have correct draw_type value. Set to either FILL (0) or STROKE (1).");
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
        // Hard code at center of object. 
        // If text does not fit within the object, do not add it.
        ctx.font = `${this.font_weight} ${this.font_size}px ${this.font_face}`;

        if (ctx.measureText(this.text).width > this.width) return;

        const center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };

        ctx.fillStyle = this.font_color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // TODO: this doesn't quite center the text
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

function updateRect(object) {
    return {
        left: object.x,
        right: object.x + object.width,
        top: object.y,
        bottom: object.y + object.height
    }
}

function defineProperty(scope, prop_name, default_value, onChange) {

    let prop_value = default_value;

    Object.defineProperty(scope, prop_name, {

        get: function() { 
            return prop_value;
        },

        set: function(value) {
            if (prop_value !== value) {
                prop_value = value;

                // NOTE: not in use as of Dec 29; 10:24PM
                if (onChange) onChange(scope);

                if (!scope.updating) {
                    scope.dispatchEvent(objectChange_event);
                }
            }
        }
    });
}