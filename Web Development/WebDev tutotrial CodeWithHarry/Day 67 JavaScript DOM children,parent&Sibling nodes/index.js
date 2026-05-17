console.log("Starting.......");
let container = document.body.children[0];
let title = container.firstElementChild;
let outer_box = container.children[1].children;

let box1 = outer_box[0];
console.log(outer_box);

for (let i=0; i<outer_box.length; i++) {
    if (i%2 == 0){
        outer_box[i].style.background = "red";
    }
}


console.log(box1.previousSibling);
console.log(box1.nextElementSibling); // next sibling of box1
console.log(box1.parentElement); // parent of box1