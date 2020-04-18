const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const inTitle = document.querySelector("#movie-title");
const inDate = document.querySelector("#movie-date");
const inPoster = document.querySelector("#movie-poster");
const movieList = document.querySelector(".col-sm-8");

addBtn.addEventListener("click", () => {
    let movieTitle = inTitle.value.trim();
    let movieDate = inDate.value.trim();
    let moviePoster = inPoster.value.trim();

    if (movieTitle === "" || movieDate === "" || moviePoster === "") {
        let alert = UI.createAlert("Please fill the gaps.", "warning");
        movieList.insertBefore(alert, movieList.firstChild);
        setTimeout(function() {
            movieList.removeChild(movieList.firstChild);
        }, 5000);
    } else {
        UI.clearInputs();
        
        let movie = new Movie(movieTitle, movieDate, moviePoster);
        let newCard = UI.createCard(movie);
        movieList.appendChild(newCard);
        Storage.addMovieToLocalStorage(movie);
        
        let alert = UI.createAlert("Movie is added successfully!", "success");
        movieList.insertBefore(alert, movieList.firstChild);
        setTimeout(function() {
            let alerts = document.querySelectorAll(".alert");
            alerts.forEach((alert) => {
                alert.parentNode.removeChild(alert);
            })
        }, 5000);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    let movies = JSON.parse(localStorage.getItem("movieArr"));
    if (movies === null) {
        let alert = UI.createAlert("There is no movie!", "danger");
        movieList.appendChild(alert);
    } else {
        movies.forEach((movie) => {
            movieList.appendChild(UI.createCard(movie));
        })
    }
})

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
        Storage.clearAll();
        UI.clearAll();
    }
})