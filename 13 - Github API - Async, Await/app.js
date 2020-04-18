const getUserBtn = document.querySelector("#get-user");
const clearAllBtn = document.querySelector("#clear-all");
const inputUsername = document.querySelector("#input-username");

const req = new GithubRequest();
const searchHistory = document.querySelector("#search-history");

const imgPlaceholder = document.querySelector("#placeholder");
const nameSurname = document.querySelector("#name");
const userDetails = document.querySelector("#github-info").querySelectorAll(".list-group-item");
const repos = Array.from(document.querySelectorAll("#repos"))[0];
const following = Array.from(document.querySelectorAll("#following"))[0];
const follower = Array.from(document.querySelectorAll("#follower"))[0];

clearAllBtn.addEventListener("click", clearAll);
getUserBtn.addEventListener("click", addToSearchHistory);
document.addEventListener("DOMContentLoaded", getSearchHistory);

function getSearchHistory() {
    if (localStorage.getItem("usernames") === null)
        localStorage.setItem("usernames", JSON.stringify([]));
    else {
        let usernames = localStorage.getItem("usernames");
        usernames = JSON.parse(usernames);
        usernames.forEach((username) => {
            searchHistory.insertBefore(createNewLiElement(username), searchHistory.firstChild);
        })
    }
}

function addToSearchHistory() {
    let username = inputUsername.value.trim();
    if (username.length > 5) {
        let usernames = localStorage.getItem("usernames");
        usernames = JSON.parse(usernames);
        usernames.push(username);
        localStorage.setItem("usernames", JSON.stringify(usernames));
        searchHistory.insertBefore(createNewLiElement(username), searchHistory.firstChild);
        getUser(username);
    }
}

function clearAll() {
    searchHistory.innerHTML = `<li class="list-group-item bg-light py-2"><button class="btn btn-dark btn-sm float-right" id="clear-all">Clear All</button></li>`;
    localStorage.setItem("usernames", JSON.stringify([]));
}

function createNewLiElement(username) {
    let newLi = document.createElement("li");
    newLi.className = "list-group-item";
    newLi.textContent = username;
    return newLi;
}

function getUser(username) {
    req.get(username)
    .then((data) => {
        if (data['message'] !== undefined)
            console.error("ERROR =>", data['message']);
        else
            updateUI(data);
    })
}

function updateUI(data) {
    imgPlaceholder.innerHTML = `<img src="` + data['avatar_url'] + `" width="350" height="350">`;
    nameSurname.textContent = data['name'];

    let userDetArr = Array.from(userDetails);
    userDetArr[0].innerHTML = `<i class="fas fa-user-alt mr-2"></i>` + data['login'];
    userDetArr[1].innerHTML = `<i class="fas fa-envelope mr-2"></i>` + data['email'];
    userDetArr[2].innerHTML = `<i class="fas fa-map-marker-alt mr-2"></i>` + data['location'];

    follower.innerHTML = data['followers'];
    following.innerHTML = data['following'];
    repos.innerHTML = data['public_repos'];
}
