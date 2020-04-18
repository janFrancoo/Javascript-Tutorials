const addBtn = document.querySelector("#add-btn");
const deleteBtn = document.querySelector("#delete-btn");
const checkBtn = document.querySelector("#check-btn");
const deleteAllBtn = document.querySelector("#delete-all-btn");

const addKey = document.querySelector("#add-key");
const deleteKey = document.querySelector("#delete-key");
const checkKey = document.querySelector("#check-key");
const value = document.querySelector("#value");

addBtn.addEventListener("click", function(e) {
    if (addKey.value != "" && value.value != "") {
        sessionStorage.setItem(addKey.value, value.value);
        // setItem(addKey.value, JSON.stringify(value.value)) => For arrays
        // JSON.parse(getItem()) => For read arrays
        // localStorage.setItem()
        addKey.value = "";
        value.value = "";
    }
});

deleteBtn.addEventListener("click", function(e) {
    if (deleteKey.value != "") {
        sessionStorage.removeItem(deleteKey.value);
        // localStorage.removeItem()
        deleteKey.value = "";
    }
});

checkBtn.addEventListener("click", function(e) {
    if (checkKey.value != "") {
        if (sessionStorage.getItem(checkKey.value) !== null)
            console.log(sessionStorage.getItem(checkKey.value));
        else
            console.log("Not match!");
        checkKey.value = "";
    }
});

deleteAllBtn.addEventListener("click", function(e) {
    sessionStorage.clear();
    // localStorage.clear()
});
