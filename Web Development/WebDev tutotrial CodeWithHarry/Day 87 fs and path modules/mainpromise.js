// const fs = require("fs/promises");

// async function readFile() {
//     try{
//         let a = await fs.readFile("first.txt");
//         console.log(a.toString());
//     }catch(error){
//         console.log(error);
        
//     }
// }

// readFile()

import fs from "fs/promises"

let a = await fs.readFile("first.txt");
// console.log(a.toString());

let b= await fs.appendFile("first.txt", "\nthei ieahskfj kjsdhfuiwn asdfjfhwoiffas");
console.log(a.toString(), b);

