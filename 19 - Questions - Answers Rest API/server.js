const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers"); // /index is redundant
const connectDatabase = require("./helpers/database/connect_database");
const CustomError = require("./middlewares/errors/custom_error_handler")
const path = require("path");

const app = express();

dotenv.config({
    path: "./config/env/config.env" 
});

connectDatabase();

app.use(express.json());
app.use("/api", routers);
app.use(CustomError);
app.use(express.static(path.join(__dirname, "public"))); // public folder -> static

app.listen(process.env.PORT, () => {
    console.log(`App is started on ${process.env.PORT} with ${process.env.NODE_ENV} mode!`);
});
