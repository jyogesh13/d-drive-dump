const chaiFlavours: string[] = ["masala", "adrak"]
const chaiPrice: number[] = [10, 20]

const rating: Array<number> = [4.5, 2.2]


// array of objects
type Chai = {
    name: string;
    price: number
}
const menu: Chai[] = [
    { name: "Masala", price: 23 },
    { name: "Adrak", price: 43 },
]

// readonly array
const cities: readonly string[] = ["Delhi", "Lucknow"]

// multidimensional array
const table: number[][] = [
    [1, 3, 4],
    [4, 5, 6]
]


// tuple in typescript
let chaiTuple: [string, number];
chaiTuple = ["masala", 32]
// chaiTuple = [32,"adrak"] //error since order of values matter in tuple

// passing optional types in tuple
let userInfo: [string, number, boolean?]
userInfo = ["yogesh", 100]
userInfo = ["yogesh", 100, true]
console.log(userInfo)

// readonly tuple
const location: readonly [number,number] = [32.4, 234.2]
// named tuple
const chaiItems: [name:string, price:number] = ["Masala",21]


// Enums
enum CupSize {
    SMALL,
    MEDIUM,
    LARGE
}
const size = CupSize.LARGE

enum Status{
    PENDING = 100,
    SERVED, //102 BY DEFAULT
    CANCELLED //103 by default
    // so either provide values to all or none at all
}

enum ChaiType{
    MASALA = "masala",
    GINGER = "ginger",
    // homogenous definition of values(preferred)
}

function makeChai(type:ChaiType){
    console.log(`Making : ${type}`)
}
makeChai(ChaiType.MASALA)

enum RandomEnum{
    ID = 1,
    NAME = "chai"
    // not a standard practice
}

const enum Sugars{
    // TO MAKE enums constant
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

// a common gotcha
let t:[string, number] = ["chai",10] //a t variable of type tuple [string,number]
// t.push("extra") //allowed because tuple are also an array so push method is applicable, keep in mind