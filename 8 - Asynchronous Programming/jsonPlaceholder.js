class Request {
    constructor () {
        this.xhr = new XMLHttpRequest();
    }

    // GET request
    get (url, callback) {
        this.xhr.open("GET", url);
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText);
            } else {
                callback("Something went wrong...", null);
            }
        }
        this.xhr.send();
    }

    // POST request
    post (url, data, callback) {
        this.xhr.open("POST", url);
        this.xhr.setRequestHeader("Content-type", "application/json");
        this.xhr.onload = () => {
            if (this.xhr.status === 201) {
                callback(null, this.xhr.responseText);
            } else {
                callback("Something went wrong...", null);
            }
        }
        this.xhr.send(JSON.stringify(data));
    }
}

const req = new Request();
req.get("https://jsonplaceholder.typicode.com/albums/", (e, response) => {
    if (e !== null && response === null) {
        console.log(e);
    } else {
        console.log(response);
    }
});

req.post("https://jsonplaceholder.typicode.com/albums", {
    "userId": 1001,
    "title": "JanFranco"
  }, (e, response) => {
    if (e !== null && response === null) {
        console.log(e);
    } else {
        console.log(response);
    }
  })
