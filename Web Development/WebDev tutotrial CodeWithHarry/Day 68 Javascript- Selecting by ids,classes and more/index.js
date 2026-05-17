console.log("starting........");
let boxes = document.querySelectorAll(".box");
console.log(boxes);



boxes.forEach(element => {
    // click event
    element.addEventListener("click", function(){
        let val1 = Math.floor(Math.random()*255);
        let val2 = Math.floor(Math.random()*255);
        let val3 = Math.floor(Math.random()*255);

        element.style.backgroundColor = `rgb(${val1}, ${val2}, ${val3})`;
        console.log("clicked");
        console.log(element.style.backgroundColor);
    })

    // mouse hover event
    // element.addEventListener("mouseover", function(){
    //     let val1 = Math.floor(Math.random()*255);
    //     let val2 = Math.floor(Math.random()*255);
    //     let val3 = Math.floor(Math.random()*255);

    //     element.style.backgroundColor = `rgb(${val1}, ${val2}, ${val3})`;
    //     console.log("clicked");
    //     console.log(element.style.backgroundColor);
    // })
});
