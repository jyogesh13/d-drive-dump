let a = prompt("Enter first number");
let b = prompt("Enter second number");

if (isNaN(a) || isNaN(b)){
    throw TypeError("Please input only integer values")
}
let sum = parseInt(a) + parseInt(b);

console.log("The sum is : ",sum);

try{
    sum /= 'a';
    throw TypeError("Cannot divide by string")
    // console.log('The sum/0 is :',sum);
}catch (error){
    console.log(`${error.name}: ${error.message}`);   
}finally{
    console.log('This is inside finally block');
    
}