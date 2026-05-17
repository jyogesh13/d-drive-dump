"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ---- union ----
let subCount = 100000;
subCount = "100k"; //valid since we defined that the subcount can be both number and string;
let apiResponseStatus = "error";
// apiResponseStatus = "done" //error since we declared that apiResponseStatus can only have one of the three values:   pending,success,error
apiResponseStatus = "success";
// ----- any -----
const orders = ["twenty", "fifty", "ten", "none"];
// let currentOrderCount; //by default it will be any as we have not defined any type for the values so it does not care about the type of values it will hold (best to avoid) as someone can assign it some different type of value which we do not need.
// eg: we need number in currentOrderCount but with 'any' string can also be assigned to currentOrderCount.
// let currentOrderCount: number;
let currentOrderCount;
for (let count of orders) {
    if (count === "none") {
        currentOrderCount = 0;
    }
}
// console.log(currentOrderCount) //this will generate error as it we are conditionally assigning the value to currentOrderCount and typescript does not know whether the condition will be fulfilled or not. (for --> let currentOrderCount: number);
console.log(currentOrderCount);
//# sourceMappingURL=unionAndany.js.map