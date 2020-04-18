async function getCurrency() {
    const response = await fetch("https://api.exchangeratesapi.io/latest");
    const data = await response.json();
    return data;
}

getCurrency()
.then((response) => {
    console.log(response['date'], response['rates']['TRY']);
})
.catch(e => console.error(e))

class Request {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const returnResponse = await response.json();
        return returnResponse;
    }
}

const request = new Request();
request.get("https://jsonplaceholder.typicode.com/posts")
.then((data) => {
    data.forEach((post) => {
        if (post['userId'] === 7)
            console.log(post);
    })
})
.catch(e => console.log(e));

request.post("https://jsonplaceholder.typicode.com/posts", {
    userId: 500,
    title: "JanFranco"
})
.then(response => console.log(response))
.catch(e => console.error(e));
