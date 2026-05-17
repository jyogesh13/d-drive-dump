/* 
Write a program to calculate factorial of a number using reduce and using for loops

6! = 6*5*4*3*2*1

*/
const factorial = (number) => {
    // using reduce function
    // array creation 1
    // let num = [];
    // for (let i = 1; i<=number; i++){
    //     num.push(i);
    // }
    // array creation 2
    // let num = Array.from(Array(number+1).keys()).slice(1);

    // return num.reduce((val1, val2) => val1 * val2);

    // using for loops
    let factorial = 1;
    for (let i=1; i<=number; i++){
        factorial *= i;
    }
    return factorial;
    
}
console.log(factorial(6));