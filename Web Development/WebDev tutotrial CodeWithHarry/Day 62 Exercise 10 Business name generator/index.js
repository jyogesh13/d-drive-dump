/* Create a business name generator by combining list of adjectives and shop name and another word

Adjectives:
Crazy 
Amazing
Fire 

Shop Name:
Engine
Foods
Garments

Another Word:
Bros
Limited
Hub

*/
let adjectives = {
    0: "Crazy",
    1: "Amazing",
    2: "Fire",
}
let shop_name = {
    0: "Engine",
    1: "Foods",
    2: "Garments",
}
let another_word = {
    0: "Bros",
    1: "Limited",
    2: "Hub",
}

const rnd_num = () =>{
    return Math.floor(Math.random() * 3);
}

let first_name = adjectives[rnd_num()];
let middle_name = shop_name[rnd_num()];
let last_name = another_word[rnd_num()];

let business_name = `${first_name} ${middle_name} ${last_name}`;
console.log(business_name);