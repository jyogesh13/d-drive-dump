"use strict";
// ----- Type Guards -----
Object.defineProperty(exports, "__esModule", { value: true });
function getChai(kind) {
    if (typeof kind === "string") {
        return `Making ${kind} chai...`;
    }
    return `chai order: ${kind}`;
}
function serveChai(msg) {
    if (msg) {
        return `serving ${msg}`;
    }
    return `serving default masala chai`;
}
function orderChai(size) {
    if (size === "small") {
        return `small cutting chai...`;
    }
    if (size === "medium" || size === "large") {
        return `make extra chai`;
    }
    return `chai order #${size}`;
}
class KulhadChai {
    serve() {
        return `Serving kulhad chai`;
    }
}
class Cutting {
    serve() {
        return `Serving cutting chai`;
    }
}
function serve(chai) {
    if (chai instanceof Cutting) {
        return chai.serve();
    }
}
function isChaiOrder(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number");
}
function serverOrder(item) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`;
    }
    return `Serving custom chai: ${item}`;
}
function brew(order) {
    if ("spicelevel" in order) {
        return `MasalaChai`;
    }
}
function MakeChai(order) {
    if (order.type === "Masala") {
        return `Masala chai`;
    }
    if (order.type === "Elaichi") {
        return `Elaichi chai`;
    }
    if (order.type === "Ginger") {
        return `Ginger chai`;
    }
}
function isStringArray(arr) {
    const order = Array.isArray(arr);
    return order;
}
const order = [10, 23];
const arr = isStringArray(order);
console.log(arr);
//# sourceMappingURL=typeNarrowing.js.map