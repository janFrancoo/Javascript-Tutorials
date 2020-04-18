const container = document.querySelector(".container");
const todoList = document.querySelector("#to-do-list");

const addBtn = document.querySelector("#add-button");
let delBtns = document.querySelectorAll(".badge");
const clearAllBtn = document.querySelector("#clear-all");

const inTodo = document.querySelector("#to-do");
const inFilter = document.querySelector("#search-to-do");

addBtn.addEventListener("click", add);
inFilter.addEventListener("keyup", filter);
clearAllBtn.addEventListener("click", clearAll);

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("tasks") === null)
        localStorage.setItem("tasks", JSON.stringify([]));
    else {
        let tasks = localStorage.getItem("tasks");
        tasks = JSON.parse(tasks);
        tasks.forEach(function(task) {
            var element = createNewLiElement(task);
            todoList.appendChild(element);
        });

        delBtns = document.querySelectorAll(".badge");
        delBtns.forEach(function(item) {
            item.addEventListener("click", remove);
        });
    }
});

function createAlert(message="Error!", type="danger") {
    let alert = document.createElement("div");
    alert.className = "alert alert-" + type + " mx-auto";
    alert.role = "alert";
    alert.style="width: 80%;"
    alert.textContent = message;
    return alert;
}

function createNewLiElement(todoMessage) {
    let todo = document.createElement("li");
    todo.className = "list-group-item p-2";
    todo.textContent = todoMessage;

    let delBtn = document.createElement("a");
    delBtn.href = "#";
    
    let span = document.createElement("span");
    span.className = "badge badge-pill badge-primary float-right";
    span.textContent = "X";

    delBtn.appendChild(span);
    todo.appendChild(delBtn);

    return todo;
}

function add() {
    let val = inTodo.value;
    val = val.trim();
    
    if (val == "") {
        container.insertBefore(createAlert("Please enter a valid task!", "warning"), container.firstChild);
        setTimeout(function() {
            container.removeChild(container.firstChild);
        }, 5000);
    } else {
        inTodo.value = "";
        todoList.appendChild(createNewLiElement(val));

        let tasks = localStorage.getItem("tasks");
        tasks = JSON.parse(tasks);
        tasks.push(val);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function remove(e) {
    e.target.parentElement.parentElement.remove();

    let task = e.target.parentElement.parentElement.textContent.slice(0, -1);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(item => item !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filter(e) {
    let filter = e.target.value.toLowerCase().trim();
    let tasks = Array.from(todoList.children);
    tasks.forEach(function(task) {
        if (task.textContent.toLowerCase().slice(0, -1).indexOf(filter) === -1) {
            task.setAttribute("style", "display: none !important;")
        } else {
            task.setAttribute("style", "display: block;");
        }
    });
}

function clearAll() {
    localStorage.clear();
    todoList.textContent = "";
}
