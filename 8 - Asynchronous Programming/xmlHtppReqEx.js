/*
    Ready state
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: response is ready
    onreadystatechange
*/

const p = document.querySelector("#load");

document.querySelector("#btn").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();

    /*
    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4)
            p.textContent = xhr.responseText;
    }
    */

    xhr.onload = () => {
        if (xhr.status === 200)
            p.textContent = xhr.responseText;
    }

    xhr.onprogress = () => {
        if (xhr.status === 200)
            console.log("Request processing...");
    }

    xhr.open("GET", "ex.txt", true);
    xhr.send();
})