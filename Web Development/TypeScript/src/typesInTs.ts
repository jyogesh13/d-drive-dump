let givenName = "Picasso" //infer automatically as string and cannot be allocated any value of different type.
// name = 23; //error: Type 'number' is not assignable to type 'string'.
// name = "23"; //no error
console.log(givenName)


let count:number = Math.random() > 0.5 ? 10 : 5; //type of value is annotated i.e explicitly defined by user;

