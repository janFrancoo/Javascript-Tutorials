const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { sendJWTToClient } = require("../helpers/auth/token_helpers");
const { validateUserInput, comparePwds } = require("../helpers/auth/input");
const CustomError = require("../helpers/error/CustomError");
const sendMail = require("../helpers/libraries/send_email");

const register = asyncHandler(async (req, res, next) => {
    const {name, email, pwd, role} = req.body;

    const user = await User.create({
        name: name,
        email: email,
        password: pwd,
        role: role
    });

    sendJWTToClient(user, res);
});

const getUser = asyncHandler(async (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });
});

const login = asyncHandler(async (req, res, next) => {
    const {email, pwd} = req.body;
    
    if (!validateUserInput(email, pwd)) {
        return next(new CustomError("Please, check inputs", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new CustomError("There is no such an e-mail address", 404));
    }

    if (!comparePwds(pwd, user.password)) {
        return next(new CustomError("Please, check your credentials", 400));
    }

    sendJWTToClient(user, res);
});

const logout = asyncHandler(async (req, res, next) => {
    const { NODE_ENV } = process.env;

    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "dev" ? false : true
    }).json({
        sucess: true,
        message: "Logout successfully"
    });
});

const imgUpload = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        "avatar": req.savedAvatar
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Avatar upload successful",
        data: user
    });
});

const forgotPwd = asyncHandler(async (req, res, next) => {
    const resetMail = req.body.email;

    const user = await User.findOne({email: resetMail});

    if (!user) {
        return next(new CustomError("This e-mail address does not exist", 400));
    }

    const resetPwdToken = user.getResetPasswordTokenFromUser();
    await user.save();
    const resetPwdUrl = `http://localhost:5000/api/auth/resetPwd?resetPwdToken=${resetPwdToken}`;
    const mailTemplate = `
        <h3>Reset Your Password</h3>
        <p>This <a href='${resetPwdUrl}' target='_blank'>link</a> will expire in 1 hour</p>`;

    try {
        await sendMail({
            from: process.env.SMTP_USER,
            to: resetMail,
            subject: "Reset password",
            html: mailTemplate
        });
        return res.status(200).json({
            success: true,
            message: "Token is sent"
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("E-mail could not be sent", 500));
    }
});

const resetPwd = asyncHandler(async (req, res, next) => {
    const { resetPwdToken } = req.query;
    const { password } = req.body;

    if (!resetPwdToken) {
        return next(new CustomError("Invalid token", 400));
    }

    let user = await User.findOne({
        resetPasswordToken: resetPwdToken,
        resetPasswordExpire: {
            $gt: Date.now()
        } 
    });

    if (!user) {
        return next(new CustomError("Invalid token or expired session", 404));
    }

    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Reset password process is successful"
    })
});

const editUserFeatures = asyncHandler(async (req, res, next) => {
    const { title, about } = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, {
        "title": title,
        "about": about
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imgUpload,
    forgotPwd,
    resetPwd,
    editUserFeatures
}