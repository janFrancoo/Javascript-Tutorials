class Storage {
    static addMovieToLocalStorage(movie) {
        let movieArr = JSON.parse(localStorage.getItem("movieArr"));
        if (movieArr === null) {
            movieArr = JSON.stringify([movie]);
            localStorage.setItem("movieArr", movieArr);
        } else {
            movieArr.push(movie);
            localStorage.setItem("movieArr", JSON.stringify(movieArr));
        }
    }

    static clearAll() {
        localStorage.clear();
    }
}