"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeChai(order) {
    console.log(order);
}
function serveChai(order) {
    console.log(order);
}
class MasalaChai {
    water = 100;
    milk = 50;
}
class teaCup {
    size = "large";
    print(size) {
        console.log(size);
    }
}
let tcup = new teaCup();
tcup.print({ size: "medium" });
//# sourceMappingURL=interfaceTs.js.map