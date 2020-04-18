
var myVar = null, myVar2;
console.log(typeof(myVar));     // object - js error (null pointer, ref object)
console.log(typeof(myVar2));    // undefined

var person = {
    name: "JanFranco",
    age: 21
}

console.log(person);            // {name: "JanFranco", age: 21}
console.log(typeof(person));    // object

var date = new Date();
console.log(date);          // Mon Mar 30 2020 16:17:44 GMT+0300
console.log(typeof(date));  // object

var hello = function() {
    console.log("Hello, World!");
}

hello();                    // Hello, World!
console.log(hello);         // f () { console.log("Hello, World!") }
console.log(typeof(hello)); // function

// const myVar3;    error
const myVar3 = 12;
// myVar3 = 21;     error

let myNum = 123;
console.log(myNum.toString());  // 123

myNum = Number(null);
console.log(myNum);             // 0

myNum = Number(undefined);
console.log(myNum);             // NaN

let web = "janfranco.com";
let email = "poisonweeb@gmail.com";
console.log("Name: " + name + "\nWeb: " + web + "\nEmail: " + email + "...");
console.log("Name: ".concat(name, "\nWeb: ", web, "\nEmail: ", email, "..."));
console.log(`Name: ${name}\nWeb: ${web}\nEmail: ${email}...`);

let num1 = 10, num2 = 5;
console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
console.log(num1 % num2);
console.log(num1 ** num2);

console.log(Math.floor(3.14));
console.log(Math.ceil(3.14));
console.log(Math.sqrt(4));

let myObj = {
    name: "janfranco",
    age: 21,
    web: "janfranco.com",
    langs: ["c", "c++", "java", "python"],
    address: {
        city: "ist",
        contry: "tr"
    }
}

console.log(myObj);
console.log(myObj.langs[2]);
console.log(myObj.address.contry);

let returnObj = function(name, age) {
    return {name: name, age: age};
}

objList = [returnObj("JanFranco", 21), returnObj("JaneFranco", 21)];
console.log(objList);

console.log(2 == 2);
console.log(2 == "2");  // compares values
console.log(2 === "2"); // compares values and types

const num = 100;
console.log(num === 120 ? "The num is 120" : "The num is not 120");

function hello(name="Unknown", age="Unknown") {
    console.log(`Hello, ${name} (${age})`);
}

hello();
hello("JanFranco");
hello("JanFranco", 21);

let test = function(a, b) {
    return a + b;
}

let test2 = test(2, 3);
console.log(test2);

(function(name) {
    console.log(name + "!");
})("JanFranco");                // IIFE (Immediately Invoked Function Expression)

let myArr = [];
for(let i=0; i<10; i++) {
    myArr[i] = Math.floor(Math.random() * 10) + 1;
}

console.log(myArr);

myArr.forEach(function(num, index) {
    console.log(index, num);
});

let objArr = [returnObj("JanFranco", 21), returnObj("JaneFranco", 21), returnObj("John Doe", 30)];
let names = objArr.map(function(p) {
    return p.name;
});
console.log(names);

let user = {
    name: "JanFranco",
    password: 123456789
};

for (let key in user) {
    console.log(key);
}

for (let n in myArr) {
    console.log(n);
}

window.alert("Hello, World!");

if (window.confirm("Are you sure?"))
    if (window.prompt("Alright, last test: 2 + 2 = ?") == 4)
        window.alert("Bravo!");
    else
        window.location.reload();
else
    window.alert("?");

console.log(window.outerHeight + " " + window.outerWidth);
