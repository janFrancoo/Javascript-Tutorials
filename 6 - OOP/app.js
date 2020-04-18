// Object Literal

const person = {
    salary: 1000,
    raiseUp: function() { this.salary += 500 }
};

console.log(person.salary);
person.raiseUp();
console.log(person.salary);

// Constructor

function Employee(salary, raiseQuan) {
    this.salary = salary;
    this.raiseUp = function() {
        this.salary += raiseQuan;
    }
}

let p1 = new Employee(1000, 500);
console.log(p1.salary);
p1.raiseUp();
console.log(p1.salary);

let p2 = new Employee(2000, 500);
// Two objects, two raiseUp method, redundant RAM usage => solution = prototypes

// Prototypes

function EmployeeNew(salary, raiseQuan) {
    this.salary = salary;
    this.raiseQuan = raiseQuan;
}

EmployeeNew.prototype.raiseUp = function() {
    this.salary += this.raiseQuan;
}

let p3 = new EmployeeNew(1000, 500);
p3.raiseUp();
console.log(p3.salary);

// EmployeeNew -> EmployeeNewPrototype -> Object => Prototype Chain

// Inheritance

function Person() { }

Person.prototype.test = () => {
    console.log("Person test");
}

function Employee2() {
    this.abc = () => {
        console.log("Employee2 abc");
    }
}

Employee2.prototype = Object.create(Person.prototype);

let emp = new Employee2();

emp.abc();
emp.test();
console.log(emp.toString());
console.log(emp);

// Call, Apply, Bind

const obj1 = {
    num1: 10,
    num2: 20
}

function sumUp(num3, num4) {
    console.log(this.num1 + this.num2 + num3 + num4);
}

sumUp.call(obj1, 100, 200);
sumUp.apply(obj1, [100, 200]);

copyFunc = sumUp.bind(obj1);
copyFunc(100, 200);
