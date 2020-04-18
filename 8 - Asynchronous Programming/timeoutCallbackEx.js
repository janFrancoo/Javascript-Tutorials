const langs = ["C", "Java", "Python"];

function addLang(callback) {
    setTimeout(() => {
        langs.push("Javascript");
        console.log("New lang is added");
        callback();
    }, 1000);
}

function getLangs() {
    langs.forEach((lang) => {
        console.log(lang);
    })
}

addLang(getLangs);