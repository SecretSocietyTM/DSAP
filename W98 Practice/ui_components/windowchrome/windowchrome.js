const dom = document.getElementById("windowchrome");

const last_child = dom.children[dom.children.length - 1];
last_child.style["border"] = "none";
last_child.style["margin"] = "0px";
console.log(last_child)


/* 
Testing new method.
*/
const dom2 = document.querySelectorAll(".w98-windowchrome");
console.log(dom2);

dom2.forEach(parent => {
    const last_child = parent.children[parent.children.length - 1];
    last_child.style["margin"] = "0px";
    last_child.style["box-shadow"] = "none";
});