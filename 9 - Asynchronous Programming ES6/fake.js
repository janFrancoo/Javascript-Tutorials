class Request {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(e => reject(e));
        });
    }

    post(url, data) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.error(e))
    }
}

const request = new Request();
request.get("https://jsonplaceholder.typicode.com/posts/1")
.then(data => console.log(data))
.catch(e => console.error(e));

request.post("https://jsonplaceholder.typicode.com/posts", {
    userId: 1001,
    title: "JanFranco"
});