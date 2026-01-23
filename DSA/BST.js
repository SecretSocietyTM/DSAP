import { Queue } from "./Queue.js";

export class BST {

    Node = class {
        constructor(value) {
            this.value = value;
            /* this.parent = null; */
            this.left = null;
            this.right = null;
        }
    }

    constructor() {
        this.root = null;
    }

    //////////////// Start Recusrive Functions ////////////////
    insert(value, node = this.root) {
        // tree has no nodes
        if (this.root === null) {
            this.root = new this.Node(value);
            return;
        }

        if (value < node.value) {

            if (node.left !== null) {
                this.insert(value, node.left);
            } else {
                node.left = new this.Node(value);
            }

        } else if (value > node.value) {

            if (node.right !== null) {
                this.insert(value, node.right);
            } else {
                node.right = new this.Node(value);
            }

        } else return;

    }

    delete(value, node = this.root) {
        
        // if delete() is called on an empty tree
        if (node === null) return node;

        if (value < node.value) {
            
            node.left = this.delete(value, node.left);
        
        } else if (value > node.value) {

            node.right = this.delete(value, node.right);

        } else {

            if (node.left === null) {

                if (node === this.root) {
                    this.root = node.right;
                    return;
                } else {
                    return node.right;
                }

            } else if (node.right === null) {

                if (node === this.root) {
                    this.root = node.right;
                    return;
                } else {
                    return node.left;
                }
            }

            // find successor from right subtree (leftmost node)
            let cur = node.right;
            while (cur.left !== null) {
                cur = cur.left;
            }

            node.value = cur.value;
            node.right = this.delete(node.value, node.right);

        }

        return node;
    }

    search(value, node = this.root) {

        if (value === node.value) {
            
            return true;

        } else if (value < node.value && node.left !== null) {

            this.search(value, node.left);

        } else if (value > node.value && node.right !== null) {

            this.search(value, node.right);

        } else return false;
    }

    inorder(node = this.root) {
        const node_list = [];

        if (node.left !== null) {
            node_list.push(...this.inorder(node.left));
        } 

        node_list.push(node.value);

        if (node.right !== null) {
            node_list.push(...this.inorder(node.right));
        }

        return node_list;
    }

    height(node = this.root) {

        if (node === null) return 0;

        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
    //////////////// End Recusrive Functions ////////////////

    levelorder(node = this.root) {
        
        const arr = [];
        const queue = new Queue();
        const height = this.height();
        const total_nodes = 2**height - 1;

        queue.enqueue(node);

        while (!queue.isEmpty() && arr.length !== total_nodes) {

            const cur_node = queue.peek();

            if (cur_node === null) {
                queue.enqueue(null);
                queue.enqueue(null);

                arr.push(null);

            } else {
                queue.enqueue(cur_node.left);
                queue.enqueue(cur_node.right);

                arr.push(cur_node.value);
            }

            queue.dequeue();
        }

        return arr;
    }

    static print(bst) {
        printBST(bst);
    }
}

function printBST(bst) {
    
    if (bst.root === null) {
        console.log("root = null");
        return;
    }

    const nodes = bst.levelorder();

    let string = "";

    let cur_lvl = 1; // root level is 0 (traditionally 1)
    for (let i = 1; i < nodes.length + 1; i++) {

        if (i === 2**cur_lvl - 1) {
            string += nodes[i - 1] + "\n";
            cur_lvl++;
        } else {
            string += nodes[i - 1] + ", "
        }
    }

    console.log(string);
}

// manually building tree
if (false) {
    const bst = new BST();
    const n1 = new bst.Node(1);
    const n2 = new bst.Node(2);
    const n3 = new bst.Node(3);
    const n4 = new bst.Node(4);
    const n5 = new bst.Node(5);
    const n6 = new bst.Node(6);
    const n7 = new bst.Node(7);

    n4.left = n2;
    n4.right = n6;

    n2.left = n1;
    n2.right = n3;

    n6.left = n5;
    n6.right = n7;

    bst.root = n4;

    BST.print(bst);
}

// manually testing delete()
if (false) {
    const bst = new BST();
    bst.insert(18);
    bst.insert(78);
    bst.insert(60);
    bst.insert(36);
    bst.insert(91);
    bst.insert(76);

    BST.print(bst);

    console.log(bst.levelorder());

    // delete leaf node
/*     bst.delete(36);
    BST.print(bst);

    // delete root node with no left child
    bst.delete(18);
    BST.print(bst); */
}