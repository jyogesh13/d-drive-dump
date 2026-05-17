const chai = {
    name: "Masala chai", //auto infer: string
    price: 20, // number
    isHot: true // boolean
}

let tea: {
    name: string,
    price: number,
    isHot: boolean
}

tea = {
    name: "Green Tea",
    price: 25,
    isHot: false
}

type Tea = {
    name: string,
    price: number,
    ingredients: string[]
}

const adrakTea: Tea = {
    name: "Adrak Tea",
    price: 30,
    ingredients: ["adrak", "tea leaves", "sugar"]
}

//----Duck Typing in typescript---
type Cup = { size: string };
let smallCup: Cup = { size: "200ml" }
let bigCup = { size: "500ml", material: "steel" }

smallCup = bigCup // no error since the bare minimum requirement for the type of data required is fulfilled

type Brew = { brewTime: number }
const coffee = { brewTime: 5, beans: "Arabica" }
const charBrew: Brew = coffee


// ---Partial<type>---
// type Partial<T> = { [P in keyof T]?: T[P]; }
// Make all properties in T optional
type Chai = {
    name: string,
    price: number,
    isHot: boolean
}

const updateChai = (updates: Partial<Chai>) => {
    console.log("updating chai with", updates)
}

updateChai({ price: 34 })
updateChai({ isHot: true })
updateChai({})

// ---Required<type>---
type ChaiOrder = {
    name?: string,
    quantity?: number
}
const placeOrder = (order: Required<ChaiOrder>) => {
    console.log(order)
}

placeOrder({ name: "Lemon tea", quantity: 3 })


// ---Pick<type, key1 | key2>---
type User = {
    firstName: string,
    lastName: string,
    age: number,
    isEmployed: boolean,
    hobbies: string[]
}

const publicUser: Pick<User, "firstName" | "lastName"> = {
    firstName: "Rohan",
    lastName: "Das"
}

// ---Omit<type, key>---
const student: Omit<User, "isEmployed"> = {
    firstName: "Parul",
    lastName: "Nimesh",
    age: 14,
    hobbies: ["reading", "coding", "gaming"]
}