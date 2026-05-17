/* Create a faulty calculator using JavaScript

This faulty calculator does following:
1. It takes two numbers as input from the user
2. It perfoms wrong operations as follows:

+ ---> -
* ---> +
- ---> /
/ ---> **


It performs wrong operation 10% of the times

*/

calculate = (num1, num2, operator) => {
    let result;

    let obj = {
        "+": "-",
        "*": "+",
        "-": "/",
        "/": "**",
    }
    if (Math.random() < 0.1) {
        // if (operator === "+") {
        //     operator = "-";
        // }
        // else if (operator === "*"){
        //     operator = "+";
        // }
        // else if (operator === "-"){
        //     operator = "/";
        // }
        // else if (operator === "/"){
        //     operator = "**";
        // }
        // or
        operator = obj[operator];
    }

    if (operator === "+"){
        result = num1 + num2;
    }
    else if (operator === "-"){
        result = num1 - num2;
    }
    else if (operator === "*"){
        result = num1 * num2;
    }
    else if (operator === "/"){
        result = num1 / num2;
    }
    else if (operator === "**"){
        result = num1 ** num2;
    }
    
    return result;
}

let sum = calculate(4 , 5, "+");
console.log(sum);