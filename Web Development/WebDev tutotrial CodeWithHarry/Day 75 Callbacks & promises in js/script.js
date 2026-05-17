function func1(num, callback){
    console.log(callback(num));

}
function square(num){
    return num**2;
}

function fetchData(callback){
    let data;
    setTimeout(()=>{
        data = {
            name: 'Rohan',
            age: 20,
        }
        callback(data);
    },1000);
}

function printData(data){
    console.log(`Name: ${data.name}\nAge: ${data.age}`);
}

// func1(5,square);
// fetchData(printData);





let promise1 = new Promise((resolve,reject) => {
    let val = Math.random();
    setTimeout(()=>{
        if (val < 0.5){
            resolve('Step 1 completed');
        }
        else{
            reject('Step 1 failed');
        }
    },1000);
});
let promise2 = new Promise(resolve => {
    setTimeout(()=>{
        resolve('Step 2 completed');
    },1000);
});
let promise3 = new Promise(resolve => {
    setTimeout(()=>{
        resolve('Step 3 completed');
    },1000);
});

// Promise.all([promise1,promise2,promise3]).then((value)=>{
//     console.log(value);
//     console.log('All steps completed');
    
// },(reason)=>{
//     console.log(reason);
// });
Promise.all([promise1,promise2,promise3]).catch((reason)=>{
    console.log("One failed",reason);
});
// Promise.any([promise1,promise2,promise3]).then((value)=>{
//     console.log(value);
//     console.log('All steps completed');
    
// },(reason)=>{
//     console.log(reason);
// });