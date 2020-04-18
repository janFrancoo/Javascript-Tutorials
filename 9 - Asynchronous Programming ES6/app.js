function getData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof data === "string") {
                resolve(data);
            } else {
                reject(new Error("Error"));
            }
        }, 2000);        
    }); 
}

console.log(getData("janfranco.com")
.then((response) => {
    console.log(response);
    return response + "comcomcomcom";
})
.then((response2) => {
    console.log(response2);
})
.catch((e) => {
    console.log(e);
}));

function getTxt() {
    fetch("ex.txt")
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(e => console.log(e));
}
getTxt();

function getJson() {
    fetch("ex.json")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
}
getJson();

function getExternal() {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(response => response.json())
    .then(data => console.log(data['date'], data['rates']['TRY']))
    .catch(e => console.log(e));
}
getExternal();