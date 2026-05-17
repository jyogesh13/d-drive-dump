// ----- Type Guards -----

function getChai(kind: string | number) {
    if (typeof kind === "string") {
        return `Making ${kind} chai...`
    }
    return `chai order: ${kind}`
}

function serveChai(msg?: string) {
    if (msg) {
        return `serving ${msg}`
    }
    return `serving default masala chai`
}

function orderChai(size: "small" | "medium" | "large" | number) {
    if (size === "small") {
        return `small cutting chai...`
    }
    if (size === "medium" || size === "large") {
        return `make extra chai`
    }
    return `chai order #${size}`
}


class KulhadChai {
    serve() {
        return `Serving kulhad chai`
    }
}
class Cutting {
    serve() {
        return `Serving cutting chai`
    }
}

function serve(chai: KulhadChai | Cutting) {
    if (chai instanceof Cutting) {
        return chai.serve()
    }
}


type ChaiOrder = {
    type: string
    sugar: number
}

function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    )
}


function serverOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`
    }
    return `Serving custom chai: ${item}`
}



type MasalaChai = { type: "Masala"; spicelevel: number };
type GingerChai = { type: "Ginger"; amount: number }
type ElaichiChai = { type: "Elaichi"; aroma: number }

type Chai = MasalaChai | GingerChai | ElaichiChai;

function brew(order: MasalaChai | GingerChai) {
    if ("spicelevel" in order) {
        return `MasalaChai`
    }
}

function MakeChai(order: Chai) {
    if (order.type === "Masala") {
        return `Masala chai`
    }
    if (order.type === "Elaichi") {
        return `Elaichi chai`
    }
    if (order.type === "Ginger") {
        return `Ginger chai`
    }
}

function isStringArray(arr: unknown): arr is string[] {
    const order = Array.isArray(arr)
    return order
}

const order = [10, 23]
const arr = isStringArray(order)
console.log(arr)