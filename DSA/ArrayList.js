const DEFAULT_CAPACITY = 5;

// TODO: figure out runtimes since they are all messed up now

export class ArrayList {
    constructor(capacity = DEFAULT_CAPACITY) {

        if (capacity < 1) throw new Error("ArrayList cannot have a capacity less than one");

        this.arr = new Array(capacity).fill(null);
        this.capacity = capacity;
        this.size = 0;
    }

    // Best: O(1) | Worst: O(n)
    insert(value, index) {

        if (index < 0 || index > this.size) {
            throw new Error("Index i out of bounds");
        } 

        if (this.size === this.capacity) {
            this.updateCapacity(this.capacity * 2);
        }

        for (let i = this.size - 1; i >= index; i--) {
            const temp = this.arr[i];
            this.arr[i + 1] = temp;
        }

        this.arr[index] = value;
        this.size++;
    }

    // Best: O(1) | Worst: O(n)
    append(value) {

        if (this.size === this.capacity) {
            this.updateCapacity(this.capacity * 2);
        }

        this.arr[this.size] = value;
        this.size++;
    }

    prepend(value) {
        this.insert(value, 0);
    }

    // O(1)
    removeByIndex(index) {

        if (this.size === 0) return;

        if (index < 0 || index > this.size) throw new Error("index out of bounds");

        const temp = this.arr[index];

        for (let i = index; i < this.size; i++) {
            this.arr[i] = this.arr[i + 1];
            this.arr[i + 1] = null;
        }

        this.size--;

        if (this.size * 3 <= this.capacity) {
            this.updateCapacity(this.capacity / 2);
        }


        return temp;
    }

    // O(n) TODO: complete
    removeByValue(value) {

        if (this.size === 0) return;

        for (let i = 0; i < this.size; i++) {
            if (this.arr[i] === value) {
                return this.removeByIndex(i);
            }
        }

        return false
    }

    // O(1)
    get(index) {

        if (index < 0 || index >= this.capacity) throw new Error("index out of bounds");

        return this.arr[index];
    }

    set(value, index) {

        if (index < 0 || index >= this.size) throw new Error("index out of bounds");

        this.arr[index] = value;
    }

    // O(n) TODO: complete
    contains(value) {

        for (let i = 0; i < this.size; i++) {
            if (this.arr[i] === value) {
                return true;
            }
        }

        return false
    }

    // TODO: should ideally be private
    updateCapacity(required_capacity) {

        required_capacity = parseInt(required_capacity);

        if (required_capacity < 1) throw new Error("ArrayList cannot have a capacity less than one")

        const cur_cap = this.capacity

        const temp = new Array(cur_cap);
        for (let i = 0; i < cur_cap; i++) {
            temp[i] = this.arr[i];
        }

        this.capacity = required_capacity;
        this.arr = new Array(cur_cap * 2).fill(null);
        for (let i = 0; i < cur_cap; i++) {
            this.arr[i] = temp[i];
        }
    }


    // static methods
    static print(sarr) {
        printArrayList(sarr);
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Visual Tests /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function printArrayList(sarr) {

    const top_bar = " ----";
    const bot_bar = " ¯¯¯¯";

    let top_string = top_bar.repeat(sarr.capacity);
    let bot_string = bot_bar.repeat(sarr.capacity);

    const space = 4;

    let mid_string = "|"
    for (let i = 0; i < sarr.capacity; i++) {

        let value = sarr.arr[i];

        if (value === null) value = "";

        const digits = String(value).length;
        const padding = Math.max(space - digits, 2);

        const str = " ".repeat(padding) + value + "|";

        mid_string += str;
    }

    console.log
    (
        top_string + "\n" +
        mid_string + "\n" +
        bot_string + "\n"
    );
}


if (true) {

    // helper
    const randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const arraylist = new ArrayList(4);
    const values = [];

    document.addEventListener("keypress", e => {
        if (e.key === "w") {

            const r = randInt(10, 99);
            values.push(r);

            console.log("appending ", r);
            arraylist.append(r);
            ArrayList.print(arraylist);
        } else if (e.key === "s") {

            console.log("removing at 0");
            arraylist.removeByIndex(0);
            ArrayList.print(arraylist);
        }
    });
}

/* 
1) Only a head/root which is eventually assigned the first node in the list
structure: 
size = 0 | head = null;
size = 1 | (*head* 15|-)-> null
size > 1 | (*head* 12|-)-> ( 5|-)-> null

2) Both a head and tail. Where the head points to (or is equal to) the first node in the list and the tail points to (or is equal to) the last node in the list
size = 0 | head = null;
size = 1 | (*head* *tail* 15|-)-> null
size > 1 | (*head* 12|-)-> ( 5|-)-> (*tail* 23|-)-> null
*/