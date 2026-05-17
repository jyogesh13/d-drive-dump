"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let response = "432";
let numericLength = response.length; //forceful type assertion
let bookString = `{"name":"Java: Complete understanding"}`;
// let bookObject = JSON.parse(bookString);
// console.log(bookObject) // typescript does not know that bookObject is of type Book thus no suggestion.
let bookObject = JSON.parse(bookString);
console.log(bookObject.name); //typescript knows that bookObject is of type book thus gives suggestion.
const inputElement = document.getElementById("username");
console.log(inputElement);
// ------ any and unknown type ------
let value;
value = "hello";
value = [24, 1, 53];
value = 3.4;
value.toUpperCase();
let newValue;
newValue = "hello";
newValue = [21, 4, 12];
newValue = 4.2;
if (typeof newValue === 'string') {
    console.log(newValue.toUpperCase());
}
try {
    // something
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log("Error: ", error);
}
function redirectBasedOnRole(role) {
    if (role === "admin") {
        console.log("Redirecting to admin dashboard ");
        return;
    }
    if (role === "user") {
        console.log("Redirecting to user dashboard");
        return;
    }
    role; //type is of never because all the value of role is already exhausted
}
//# sourceMappingURL=moreTypes.js.map