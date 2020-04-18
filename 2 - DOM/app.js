
const clearBtn = document.querySelector("#clear-all");

const liItems = document.querySelectorAll(".list-group-item .p-2");
liItems.forEach(function(el) {
    el.style.color = "red";
});

const h5Filter = document.querySelector(".card").children[1].children[1].children[0]
h5Filter.textContent = "Search";

// <button type="submit" class="btn btn-dark btn-sm col-2" id="clear-all">Clear All</button>

const newBtn = document.createElement("button");
newBtn.type = "submit";
newBtn.className = "btn btn-primary btn-sm";
newBtn.appendChild(document.createTextNode("Click Me!"));
clearBtn.parentElement.appendChild(newBtn);

const todoList = document.querySelector(".list-group .list-group-flush");
const newTodo = document.createElement("li");
newTodo.className = "list-group-item p-2";
newTodo.appendChild(document.createTextNode("Lorem impsum."));

for (let i=0; i<5; i++)
    todoList.appendChild(newTodo.cloneNode(true));

const newLi = document.createElement("li");
newLi.className = "list-group-item p2";
const newH5 = document.createElement("h5");
newH5.className = "font-weight-normal";
newH5.appendChild(document.createTextNode("TO-DO item"));
newLi.appendChild(newH5);

const oddTodos = todoList.querySelectorAll("li:nth-child(odd)");
oddTodos.forEach(function(el) {
    todoList.replaceChild(newLi.cloneNode(true), el);
});

const evenTodos = todoList.querySelectorAll("li:nth-child(even)");
evenTodos.forEach(function(el) {
    el.remove();
});

const lastTodo = todoList.lastChild.children[0];
lastTodo.classList.add("m-5");

const cardHeader = document.querySelector(".card-header");
document.addEventListener("keyup", function(e) {
    cardHeader.textContent = e.target.value;
});

const addBtn = document.querySelector("#add-button");

addBtn.addEventListener("click", function(e) {
    let val = document.querySelector("#to-do").value;
    let newTodo = document.createElement("li");
    newTodo.className = "list-group-item p-2";
    newTodo.textContent = val;
    todoList.appendChild(newTodo);
    e.preventDefault(); // form action disabled
});

document.addEventListener("DOMContentLoaded", function(e) {
    console.log("Page is loaded!");
});