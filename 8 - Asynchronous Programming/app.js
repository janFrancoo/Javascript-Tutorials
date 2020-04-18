const empList = document.querySelector("#emp-list");
let counter = 1;

document.querySelector("#load-btn").addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            counter = 1;
            JSON.parse(xhr.responseText).forEach((emp) => {
                empList.innerHTML += 
                    `<tr>
                        <th scope="row">${counter}</th>
                        <td>${emp.name}</td>
                        <td>${emp.dep}</td>
                        <td>${emp.salary}</td>
                    </tr>`;
                counter += 1;
            })
        }
    }
    xhr.open("GET", "employees.json", true);
    xhr.send();
})
