class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(url, callback) {
        this.xhr.open("GET", url);
        this.xhr.onload = () => {
            if (this.xhr.status === 200)
                callback(null, this.xhr.responseText);
            else
                callback("Something went wrong...", null);
        }
        this.xhr.send();
    }
}