const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const blockUser = asyncHandler(async (req, res, next) => {
    const user = req.data;
    user.blocked = !user.blocked;
    await user.save();

    res.status(200).json({
        success: true,
        data: user
    });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const user = req.data;
    await user.remove();

    res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = {
    blockUser,
    deleteUser
}