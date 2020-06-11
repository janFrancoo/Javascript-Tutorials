const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if (customError.name === "SyntaxError") {
        customError = new CustomError("Unexpected syntax", 400);
    } else if (customError.name === "ValidationError") {
        customError = new CustomError(err.message, 400);
    } else if (customError.code == 11000) {
        customError = new CustomError("Database duplicate key error: " + Object.values(customError.keyValue)[0], 400);
    } else if (customError.name === "CastError") {
        customError = new CustomError("Database not found error: " + customError.value, 400);
    }

    console.log("Error -> " + customError.name, customError.message, customError.status);

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    });
}

module.exports = customErrorHandler;