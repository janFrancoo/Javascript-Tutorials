const Answer = require("../models/Answer");
const Question = require("../models/Question");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const askNewQuestion = asyncHandler(async (req, res, next) => {
    const info = req.body;
    const question = await Question.create({
        ...info,    // equals title: info.title, ...
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        data: question
    });
});

const getAllQuestions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult);
});

const getSingleQuestion = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult);
});

const editQuestion = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;

    if (!(title || content)) {
        return next(new CustomError("Please, provide inputs properly", 400));
    }
    
    const question = req.data;

    if (title)
        question.title = title;
    if (content)
        question.content = content;
    await question.save();

    res.status(200).json({
        success: true,
        data: question 
     });
});

const deleteQuestion = asyncHandler(async (req, res, next) => {
    const question = req.data;
    await question.delete();

    
    await Answer.deleteMany({
            question: question._id
    });

    res.status(200).json({
        success: true,
        data: question
    });
});

const likeQuestion = asyncHandler(async (req, res, next) => {
    const question = req.data;

    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400));
    }

    question.likes.push(req.user.id);
    question.likeCount = question.likes.count;
    await question.save();

    res.status(200).json({
        success: true,
        data: question
    });
});

const unlikeQuestion = asyncHandler(async (req, res, next) => {
    const question = req.data;
    const idx = question.likes.indexOf(req.user.id);

    if (idx !== -1) {
        question.likes.splice(idx, 1);
        question.likeCount = question.likes.count;
        await question.save();
    }

    res.status(200).json({
        success: true,
        data: question
    });
});

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    unlikeQuestion
}