let id = 0;

function createId() {
    const result = id;
    id++;

    return result;
}

export class Object2D {
    constructor() {
        this.id = createId();
    }

    // overwrite with a function in the class
    // that extednds Object2D
    intersects() {
        console.error("No intersects() function defined");
    }
}