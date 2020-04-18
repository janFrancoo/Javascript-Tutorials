class UI {
    static createAlert(message="Error", alertType="danger", ms=0) {
        let alert = document.createElement("div");
        alert.className = "shadow-sm mb-4 alert alert-" + alertType;
        alert.textContent = message;
        return alert;
    }

    static createCard(movie) {
        let poster = document.createElement("img");
        poster.src = movie.url;
        poster.className = "card-img";

        let col4 = document.createElement("div");
        col4.className = "col-md-4";
        col4.appendChild(poster);

        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = movie.title;

        let date = document.createElement("small");
        date.className = "text-muted";
        date.textContent = movie.date;
            
        let dateP = document.createElement("p");
        dateP.className = "card-text";
        dateP.appendChild(date);

        let textP = document.createElement("p");
        textP.className = "card-text";
        textP.textContent = "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
   
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.appendChild(title);
        cardBody.appendChild(dateP);
        cardBody.appendChild(textP);

        let col8 = document.createElement("div");
        col8.className= "col-md-8";
        col8.appendChild(cardBody);

        let noGlutters = document.createElement("div");
        noGlutters.className = "row no-glutters";
        noGlutters.appendChild(col4);
        noGlutters.appendChild(col8);

        let card = document.createElement("div");
        card.className = "card mb-3 mx-auto shadow-lg";
        card.style = "max-width: 540px;"
        card.appendChild(noGlutters);

        return card;
    }

    static clearInputs() {
        inDate.value = "";
        inTitle.value = "";
        inPoster.value = "";
    }

    static clearAll() {
        movieList.textContent = "";
        let alert = UI.createAlert("There is no movie!", "danger");
        movieList.appendChild(alert);
    }
}