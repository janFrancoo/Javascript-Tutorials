class GithubRequest {
     
    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async get(username) {
        const response = await fetch(this.url + username);
        const data = await response.json();
        return data;
    }

}
