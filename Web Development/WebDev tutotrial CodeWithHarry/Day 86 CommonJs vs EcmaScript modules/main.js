// const http = require('node:http'); //common JS : default

// for using EcmaScript modules we have to add " "type": "module" " into package.json
// import {a,b,d} from "./module1.js" //named import from module1.js
// import yogesh_data from "./module1.js" //default import from module1.js


// console.log({a,b,d});
// console.log(yogesh_data);


// Common JS

// (function (exports, require, response, __dirname, __filename){
//     // module code actually lives here 
// })();

const a = require("./module2.js")
console.log(a, __dirname);


