// create a new package using npm init
const fs = require("fs");

console.log("starting....");

// this is not used as it is synchronous in nature and stops the code block untill it finishes execution...
// fs.writeFileSync("first.txt", "This is temp file..."); 


//this is an asynchronous approach, in this we provide a callback...
//but here another problem of callback hell may arise...
fs.writeFile("first.txt", "This is a temp file...", ()=>{
    console.log('Done writing...');
    fs.readFile("first.txt", (error, data)=>{
        console.log(error, data.toString());
    });
});

fs.appendFile("first.txt", "Appended content", (error,data)=>{
    console.log(data);
});


//to avoid the problem of callback hell, we can use promises in fs module....shown in mainpromise.js
console.log('Ending....');
