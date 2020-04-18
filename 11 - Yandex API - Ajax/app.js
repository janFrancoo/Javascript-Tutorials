const input = document.querySelector("#input-word")
const translateBtn = document.querySelector("#translate");
const responses = document.querySelectorAll(".card-title");
const langDiv = document.querySelector("#lang-div");

let word = "";
const langCodes = ["en", "de", "it"];
const req = new Request();

translateBtn.addEventListener("click", () => {
    if (input.value.trim().length > 3) {
        word = input.value.trim();
        let i = 0;
        let data = setInterval(() => {
            req.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200407T034558Z.c498b3ad4b4c2332.0579f5a9cf61a72318b92a9cb2415580f966b3f8&text=" + word + "&lang=" + langCodes[i], 
            (e, response) => {
                if (e !== null && response === null)
                    console.log(e);
                else
                    responses[i+1].textContent = JSON.parse(response)['text'];
                i++;
                if (i == 3) {
                    clearInterval(data);
                    langDiv.className = "row justify-content-between mt-5";
                }
            })
        }, 500);
    }
})