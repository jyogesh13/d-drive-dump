// OOPS IN JAVASCRIPT

// objects in JAVASCRIPT

//aam zindagi
let monuments={
    name: "Ram Temple",
    country: "India",
};

//mentos zindagi using new keyword
let cars = new Object();
cars.brand = "Audi";
cars.name = "Audi R8";
cars.speed = function(){
    return `${this.brand} runs at a very high speed`;
}

console.log(cars.speed());


// using Contructor function (pre ES6 javascript)

function Student(name,age){
    this.name = name;
    this.age = age;
}
Student.prototype.greet = function(){
    console.log(`Hello my name is ${this.name}`);
};

const newstudent = new Student("Rohan", 23);
// newstudent.greet();


// After ES6 for creating objects javascript uses Classes
class Person{
    constructor(){
        this.name = '';
        this.age = 0;
    }

    //Instance method
    greet(){
        console.log(`Hi, I'm ${this.name} and I am ${this.age} years old.`);
    }

    //static methods: associated directly to class not to the object
    static info(){
        console.log('This is a Person class');   
    }

    //setting the name
    set name(value){
        this._name = value;
    }

    //getting the name
    get name(){
        return this._name;
    }

    //setting the value for age
    set age(value){
        this._age = value;
    }

    //getting the age
    get age(){
        return this._age;
    }

}

class Employee extends Person{
    constructor(name,age,role){
        super(name,age); //calls person class's constructor
        this.role = role;
    }

    //overriding greet method of parent class
    greet(){
        console.log(`Hi, I'm ${this.name}, I am ${this.age} years old and I am a ${this.role}`);
    }
}

let p1 = new Person();
p1.name = "sonali";
p1.age = 23;

// console.log(p1.name);
// console.log(p1.age);

let emp1 = new Employee("",0,"Developer");
emp1.name = "Shruti";
emp1.age = 23;
// emp1.greet();


/*Exercise 1: Basic Class Creation
    Create a class Car that has properties for make, model, and year. Include a method called displayInfo that prints these details.

    Challenge:
        Create two instances with different values.
        Try to access displayInfo from the class without instantiating it and see what happens.
*/

class Car{
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    displayInfo(){
        console.log(`The ${this.make} of ${this.model} model is made in ${this.year}`);
    }
}

let car1 = new Car("Audi", "Audi R8", "2019");
car1.displayInfo();
Car.displayInfo();
