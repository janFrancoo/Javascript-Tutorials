const express = require("express");
const {accessControl} = require("./middleWare");

const users = [
    {id: 1, name: "JanFranco", place: "TR"},
    {id: 2, name: "JaneFranco", place: "TR"}
];

const app = express();
const PORT = 5000;

// Before every route, run middleware:
// app.use(accessControl);
app.use(express.json()); // for getting json data in body

// GET
app.get("/users", [accessControl], (req, res, next) => {
    // res.send("<h1>Hello, Express!</h1>");
    res.json({
        success: true,
        data: users
    });
});

// POST
app.post("/users", (req, res, next) => {
    users.push(req.body);
    res.json({
        success: true,
        data: req.body
    });
});

// PUT
app.put("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    let i;
    for (i=0; i<users.length; i++) {
        if (users[i].id == id) {
            users[i] = {
                ...users[i],
                ...req.body
            };
            break;
        }
    }
    res.json({
        success: true,
        data: users[i]
    });
});

// DELETE
app.delete("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    let user;
    for (let i=0; i<users.length; i++) {
        if (users[i].id == id) {
            user = users.splice(i, 1);
            break;
        }
    }

    res.json({
        success: true,
        data: user
    })
})

app.listen(PORT, () => {
    console.log("Server is started!");
});
