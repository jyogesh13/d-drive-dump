type ChaiOrder = {
    type: string;
    sugar: number;
    strong: boolean;
}

function makeChai(order: ChaiOrder) {
    console.log(order)
}

function serveChai(order: ChaiOrder) {
    console.log(order)
}

type TeaRecipe = {
    water: number;
    milk: number
}

class MasalaChai implements TeaRecipe {
    water = 100;
    milk = 50
}

// type Cupsize = "small" | "medium" | "large"

// class teaCup implements Cupsize{ 
//throws error , hence in general with classes we use interface
// }

interface CupSize {
    size: "small" | "medium" | "large"
}

class teaCup implements CupSize {
    size: "small" | "medium" | "large" = "large";
    print(size: CupSize) {
        console.log(size)
    }
}
let tcup = new teaCup()
tcup.print({ size: "medium" });


// ---- intersection ----
type BaseIngredient = { teaLeaves: number }
type Extra = { masala: number }

type SplTea = BaseIngredient & Extra

const cup: SplTea = {
    teaLeaves: 2,
    masala: 1
}

// ---optional values---
type User = {
    username: string,
    bio?: string
}
const u1: User = { username: "Rohan" }
const u2: User = { username: "Rahul", bio: "Rahul's bio" }

// ---- readonly values ----
// they should be assigned once and then cannot be re assigned

type Config = {
    readonly appName: string
    version: number
}
const appConfig: Config = {
    appName: "Blogsite",
    version: 1,
}

// appConfig.appName = "TaskManager" //this will generate an error and the appName is a readonly property

