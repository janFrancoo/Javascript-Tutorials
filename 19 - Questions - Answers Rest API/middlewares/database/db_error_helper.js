const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");
const asyncHandler = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserExists = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError("No such user", 404));
    }

    req.data = user;
    next();
});

const checkQuestionExists = asyncHandler(async (req, res, next) => {
    const questionId = req.params.id || req.params.question_id;
    
    const question = await Question.findById(questionId).populate("answers");

    if (!question) {
        return next(new CustomError("No such question", 404));
    }

    req.data = question;
    next();
});

const checkAnswerExists = asyncHandler(async (req, res, next) => {
    const { answer_id } = req.params;
    
    const answer = await Answer.findById(answer_id);

    if (!answer) {
        return next(new CustomError("No such answer", 404));
    }

    req.data.answer = answer;
    next();
});

module.exports = {
    checkUserExists,
    checkQuestionExists,
    checkAnswerExists
}