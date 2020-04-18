function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.info = () => {
    console.log(this.name, this.age);
}

function Student(name, age, school, grade) {
    Person.call(this, name, age);
    this.school = school;
    this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);

let student = new Student("JanFranco", 21, "MAU", 3.54);
student.info();
