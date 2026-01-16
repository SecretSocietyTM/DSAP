import { ArrayList } from "./ArrayList.js";
import { LinkedList } from "./LinkedList.js";
import { Stack } from "./Stack.js";
import { Queue } from "./Queue.js";
import { BST } from "./BST.js";

const header = document.getElementById("header");

let active_w_function = function() {console.log("no bound 'w' functoin")}; 
let active_s_function = function() {console.log("no bound 's' function")};

let active_dsa = null;
let active_values = null;

document.body.addEventListener("click", e => {
    const el = e.target;

    console.clear();

    switch(el.id) {
    case "arraylist":

        header.textContent = "Array List";
        active_dsa = new ArrayList(4);
        active_w_function = arraylistWFunc;
        active_s_function = arraylistSFunc;
        break;

    case "linkedlist":

        header.textContent = "Linked List";
        active_dsa = new LinkedList();
        active_values = [];
        active_w_function = linkedlistWFunc;
        active_s_function = linkedlistSFunc;
        break;

    case "stack":

        header.textContent = "Stack";
        active_dsa = new Stack();
        active_w_function = stackWFunc;
        active_s_function = stackSFunc;        
        break;
    
    case "queue":

        header.textContent = "Queue";
        active_dsa = new Queue();
        active_w_function = queueWFunc;
        active_s_function = queueSFunc;   

        break;
    case "bst":

        header.textContent = "Binary Search Tree";
        active_dsa = new BST();
        active_values = [];
        active_w_function = bstWFunc;
        active_s_function = bstSFunc;
        break;

    }
});

document.addEventListener("keypress", e => {
    if (e.key === "w") active_w_function(active_dsa, active_values);
    else if (e.key === "s") active_s_function(active_dsa, active_values);
});


//////////////////////////// ArrayList ////////////////////////////
function arraylistWFunc(arraylist) {
    const r = randInt(10, 99);

    console.log("appending ", r);
    arraylist.append(r);
    ArrayList.print(arraylist);
}

function arraylistSFunc(arraylist) {
    console.log("removing at 0");
    arraylist.removeByIndex(0);
    ArrayList.print(arraylist);
}


//////////////////////////// LinkedList ////////////////////////////
function linkedlistWFunc(linkedlist, arr) {
    const r = randInt(10, 99);
    arr.push(r);

    console.log("appending ", r);
    linkedlist.append(r);
    LinkedList.print(linkedlist);
}

function linkedlistSFunc(linkedlist, arr) {
    let r;

    if (arr.length !== 0) {
        const idx = randInt(0, arr.length - 1);
        r = arr[idx];

        arr.splice(idx, 1);
    } else {
        r = randInt(10, 99);
    }

    console.log("removing first occurance of", r);
    linkedlist.removeByValue(r);
    LinkedList.print(linkedlist);
}


//////////////////////////// Stack ////////////////////////////
function stackWFunc(stack) {
    const r = randInt(10, 99);

    console.log("pushing ", r);
    stack.push(r);
    Stack.print(stack);
} 

function stackSFunc(stack) {
    console.log("popping");
    stack.pop();
    Stack.print(stack);
}


//////////////////////////// Queue ////////////////////////////
function queueWFunc(queue) {
    const r = randInt(10, 99);

    console.log("enqueuing ", r);
    queue.enqueue(r);
    Queue.print(queue);    
}

function queueSFunc(queue) {
    console.log("dequeuing");
    queue.dequeue();
    Queue.print(queue);
}


//////////////////////////// BST ////////////////////////////
function bstWFunc(bst, arr) {
    const r = randInt(10, 99);
    arr.push(r);

    console.log("inserting ", r);
    bst.insert(r);
    BST.print(bst); 
}

function bstSFunc(bst, arr) {
    let r;

    if (arr.length !== 0) {
        const idx = randInt(0, arr.length - 1);
        r = arr[idx];

        arr.splice(idx, 1);
    } else {
        r = randInt(10, 99);
    }

    console.log("deleting", r);
    bst.delete(r);
    BST.print(bst);
}


const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}