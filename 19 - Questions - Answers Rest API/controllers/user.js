const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const getSingleUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.data
    });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult);
});

module.exports = {
    getSingleUser,
    getAllUsers
}