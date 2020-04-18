class Exchange {
    constructor() {
        this.url = "https://api.exchangeratesapi.io/latest?base=";
    }

    get(base) {
        return new Promise((resolve, reject) => {
            fetch(this.url + base)
            .then(response => response)
            .then(data => resolve(data.json()))
            .catch(e => reject(e));
        });
    }

    calculate(rates, target, amount) {
        return rates['rates'][target] * amount;
    }
}