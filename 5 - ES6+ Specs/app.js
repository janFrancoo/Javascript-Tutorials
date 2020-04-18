// Arrow Functions

const num = 8;

function cube1(x) {
    return x ** 3;
}

console.log(cube1(num));

const cube2 = function(x) {
    return x ** 3;
}

console.log(cube2(num));

const cube3 = (x) => {
    return x **3;
}

console.log(cube3(num));

const cube4 = x => x ** 3;

console.log(cube4(num));

// Destructing

const arr = [1, 2, 3, 4, 5];

num1 = arr[0];
num2 = arr[1];

[num1, num2] = arr;
console.log(num1, num2);

// Spread

num1 = arr[0];
num2 = arr[1];
others = [arr[2], arr[3], arr[4]];

[num1, num2, ...others] = arr;
console.log(num1, num2, others)

// For of & Maps

const obj = {
    a: 12,
    b: 23,
    c: 46
};

obj["d"] = 51;
console.log(obj, obj["a"]);

for (let key in obj) {
    console.log(key, obj[key]);
}
/*
for (let [key, value] of obj) {
    console.log(key, value);
}
*/ // Error

let map = new Map();

map.set("a", 10);
map.set("b", 100);
map.set("c", 1000);

for (let [key, value] of map) {
    console.log(key, value);
}

for (let key of map.keys()) {   // map.values()
    console.log(key);
}

const array = [["key1", "val1"], ["key2", "val2"]];
let newMap = new Map(array);
console.log(newMap);

// Sets

const set = new Set();

set.add(10);
set.add(10);
console.log(set);
