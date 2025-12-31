import { Object2D } from "./Object2D.js";

// add customization like LEFT-RIGHT / RIGHT-LEFT for how things are added
const GROUP_TYPE = {ROW: 0, COLUMN: 1};

export class Group extends Object2D {
    constructor(x = 0, y = 0) {
        super();

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;

        // row by default
        this.type = GROUP_TYPE.ROW;

        this.children = [];
        this.len = 0;

        this.gap = 0;
        this.border = 0;

        this.fill_color = "black" // TODO: can I use transparant?
    }

    addChild(object) {

        if (this.children.length === 0) {
            object.x = this.x;
            object.y = this.y;
        } else {
            const last_child = this.children[this.children.length - 1];

            switch (this.type) {
            case GROUP_TYPE.ROW:
                object.x = last_child.x + last_child.width + this.gap;
                object.y = this.y;
                break;
            case GROUP_TYPE.COLUMN:
                object.x = this.x;
                object.y = last_child.y + last_child.height + this.gap;
                break;
            default: 
                throw new Error("Group object does not have correct type value. Set to either ROW (0) or COLUMN (1).");
            }
        }

        this.children.push(object);
        this.len++;

        this.width = (object.x + object.width) - this.children[0].x;
        this.height = (object.y + object.height) - this.children[0].y;
    }

    draw(ctx) {
        ctx.fillStyle = this.fill_color;
        ctx.fillRect(
            this.x - this.border, 
            this.y - this.border, 
            this.width + (this.border * 2), 
            this.height + (this.border * 2)
        );

        this.children.forEach(child => child.draw(ctx));
    }
}