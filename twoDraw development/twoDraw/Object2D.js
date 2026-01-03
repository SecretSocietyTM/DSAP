import EventDispatcher from "./EventDispatcher.js";

let id = 0;

function createId() {
    const result = id;
    id++;

    return result;
}

export class Object2D extends EventDispatcher {
    constructor() {
        super();

        this.id = createId();
    }

    // overwrite with a function in the class
    // that extednds Object2D
    intersects() {
        console.error("No intersects() function defined");
    }
}