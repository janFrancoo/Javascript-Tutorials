const amountInput = document.querySelector("#amount");
const selectBase = document.querySelector("#base");
const selectTarget = document.querySelector("#target");
const rateBtn = document.querySelector("#rate");
const pModel = document.querySelector("#exchange");

const exchange = new Exchange();

rateBtn.addEventListener("click", () => {
    exchange.get(selectBase.value)
    .then((response) => {
        pModel.textContent = exchange.calculate(response, selectTarget.value, amountInput.value);
    })
    .catch(e => console.error(e));
});
