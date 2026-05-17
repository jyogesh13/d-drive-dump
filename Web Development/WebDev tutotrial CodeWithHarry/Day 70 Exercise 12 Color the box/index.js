console.log("starting......");
let boxes = document.querySelector(".container").children;
let btn = document.getElementsByClassName("btn");

function color(){
    let val1 = Math.floor(Math.random()*255);
    let val2 = Math.floor(Math.random()*255);
    let val3 = Math.floor(Math.random()*255);

    return `rgb(${val1},${val2},${val3})`;
}

// changing color on button press
for (let i=0; i<btn.length; i++){
    btn[i].addEventListener("click", ()=>{
        boxes[i].style.backgroundColor = color();
    })
}

// changing color on box click
Array.from(boxes).forEach((box)=>{
    box.addEventListener("click",()=>{
        box.style.backgroundColor = color();
    })
})