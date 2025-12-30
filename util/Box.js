import { Object2D } from "./Object2D.js";

const DRAW_TYPE = {FILL: 0, STROKE: 1};

const objectChange_event = {type: "objectChange"};

export class Box extends Object2D {
    constructor(x = 0, y = 0, width, height) {
        super();

        defineProperty(this, "x", x, s => s._dirty.rect = true);
        defineProperty(this, "y", y, s => s._dirty.rect = true);
        defineProperty(this, "width", width, s => s._dirty.rect = true);
        defineProperty(this, "height", height, s => s._dirty.rect = true);

        defineProperty(this, "draw_type", DRAW_TYPE.FILL, s => {
            s._dirty.geometry = true;
            s._dirty.rect = true;
        });

        defineProperty(this, "stroke_width", 1, s => {
            if (s.draw_type === DRAW_TYPE.STROKE) {
                s._dirty.geometry = true;
                s._dirty.rect = true;
            }
        });

        

        // rect must be calculated differently depending on the draw_type
        this.rect = this.updateRect(this);

        // Box settings
        this.fill_color = "black";
        this.stroke_color = "black";

        // Text settings
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
            geometry: false,
            rect: false,
        };

        //
        // event listeners
        this.addEventListener(objectChange_event.type, () => {
            this.update();
        });
    }

    update() {
        if (!this._dirty.geometry && !this._dirty.rect) return;

        this.updating = true;

        if (this._dirty.geometry) {
            this.updateGeometry();
        }

        if (this._dirty.rect) {
            this.updateRect(this);
        }

        this.updating = false;
        this._dirty.geometry = false;
        this._dirty.rect = false;
    }

    updateGeometry() {
        const div2 = this.stroke_width / 2;

        switch (this.draw_type) {
        case DRAW_TYPE.FILL:
            this.x = this.x - div2;
            this.y = this.y - div2;
            this.width = this.width + div2;
            this.height = this.height + div2;
            break;
        case DRAW_TYPE.STROKE:
            this.x = this.x + div2;
            this.y = this.y + div2;
            this.width = this.width - this.stroke_width;
            this.height = this.height - this.stroke_width;
            break;
        default: 
            throw new Error("Box object does not have correct draw_type value. Set to either FILL (0) or STROKE (1).");
        }
    }

    updateRect(object) {

        let rect = {};

        switch (object.draw_type) {
        case DRAW_TYPE.FILL:
            rect = {
                left: object.x,
                right: object.x + object.width,
                top: object.y,
                bottom: object.y + object.height
            }
            break;
        case DRAW_TYPE.STROKE:
            const div2 = object.stroke_width / 2;

            rect = {
                left: object.x - div2,
                right: object.x + object.width + div2,
                top: object.y - div2,
                bottom: object.y + object.height + div2
            }
            break;
        default: 
            throw new Error("Box object does not have correct draw_type value. Set to either FILL (0) or STROKE (1).");
        }

        return rect;
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

function defineProperty(scope, prop_name, default_value, onChange) {

    let prop_value = default_value;

    Object.defineProperty(scope, prop_name, {

        get: function() { 
            return prop_value;
        },

        set: function(value) {
            if (prop_value !== value) {
                prop_value = value;

                if (onChange) onChange(scope);

                if (!scope.updating) {
                    scope.dispatchEvent(objectChange_event);
                }
            }
        }
    });
}