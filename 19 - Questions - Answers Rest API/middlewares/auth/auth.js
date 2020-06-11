const CustomError = require("../../helpers/error/CustomError");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/auth/token_helpers");
const jwt = require("jsonwebtoken");
const Question = require("../../models/Question");
const asyncHandler = require("express-async-handler");

const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;

    if (!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access", 401));
    }

    const access_token = getAccessTokenFromHeader(req);

    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized to access", 401));
        } 
        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role
        };
        next();
    });
}

const getAdminAccess = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new CustomError("You do not have admin authority to access here", 403));
    }
    next();
}

const getQuestionOwnerAccess = asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (question.user != req.user.id ) {
        return next(new CustomError("Only question owner can access here", 403));
    }
    next();
});

const getAnswerOwnerAccess = asyncHandler(async (req, res, next) => {
    const answer = req.data.answer;

    if (answer.user != req.user.id ) {
        return next(new CustomError("Only answer owner can access here", 403));
    }
    next();
});

module.exports = {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
};