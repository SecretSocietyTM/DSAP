const dom = document.getElementById("windowchrome");

const last_child = dom.children[dom.children.length - 1];
last_child.style["border"] = "none";
last_child.style["margin"] = "0px";
console.log(last_child)