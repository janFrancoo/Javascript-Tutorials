class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    info() {
        console.log(this.name, this.age);
    }
}

let person = new Person("JanFranco", 21);
person.info();

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);
        this.school = school;
    }
    info () {
        console.log(this.name, this.age, this.school);
    }
}

let student = new Student("JanFranco", 21, "Maltepe UNI");
student.info();
