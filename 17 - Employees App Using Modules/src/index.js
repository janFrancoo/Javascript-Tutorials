import {Request} from "./handle";

const addBtn = document.querySelector("#add-btn");
const nameInput = document.querySelector("#name");
const depInput = document.querySelector("#dep");
const salInput = document.querySelector("#sal");
const employeeTable = document.querySelector("#tbody");

const request = new Request('http://localhost:3000/employees');
eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getEmployees);
    addBtn.addEventListener("click", addEmployee);
}

function getEmployees() {
    let results = '';
    request.get()
    .then(employees => {
        employees.forEach(employee => {
            results += `
                <tr>
                    <th scope="row">${employee.id}</th>
                    <td>${employee.name}</td>
                    <td>${employee.dep}</td>
                    <td>${employee.salary}</td>
                </tr>
            `
        });
        employeeTable.innerHTML = results;
    })
    .catch(err => console.log(err));
}

function addEmployee() {
    let nameVal = nameInput.value.trim();
    let depVal = depInput.value.trim();
    let salaryVal = salInput.value.trim();
    clearInputs();

    if (nameVal.length > 5 && depVal.length > 3) {
        request.post({
            name: nameVal,
            dep: depVal,
            salary: salaryVal
        })
        .then(response => {
            let result = `
                <tr>
                    <th scope="row">${response.id}</th>
                    <td>${response.name}</td>
                    <td>${response.dep}</td>
                    <td>${response.salary}</td>
                </tr>
            `
            employeeTable.innerHTML += result;
        })
        .catch(err => console.log(err));
    }
}

function clearInputs() {
    nameInput.value = "";
    depInput.value = "";
    salInput.value = "";
}
