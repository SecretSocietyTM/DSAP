import { Object2D } from "./Object2D.js";

// add customization like LEFT-RIGHT / RIGHT-LEFT for how things are added
const GROUP_TYPE = {ROW: 0, COLUMN: 1};

export class Group extends Object2D {
    constructor(x = 0, y = 0) {
        super();

        this.x = x;
        this.y = y;

        // row by default
        this.type = GROUP_TYPE.ROW;

        this.children = [];

        this.gap = 0;
    }

    addChild(object) {

        if (this.children.length !== 0) {
            const last_child = this.children[this.children.length - 1];
            switch (this.type) {
            case GROUP_TYPE.ROW:
                /* object.x = last_child.x + last_child.width + this.gap; */
                object.x = last_child.rect.right + this.gap;
                object.y = this.y;
                break;
            case GROUP_TYPE.COLUMN:
                object.x = this.x;
                object.y = last_child.y + last_child.height + this.gap;
                break;
            default: 
                throw new Error("Group object does not have correct type value. Set to either ROW or COLUMN.");
            }
        } else {
            object.x = this.x;
            object.y = this.y;
        }

        this.children.push(object);
    }

    draw(ctx) {
        this.children.forEach(child => child.draw(ctx));
    }
}