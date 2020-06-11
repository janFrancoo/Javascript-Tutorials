const Answer = require("../models/Answer");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const getAllAnswers = asyncHandler(async (req, res, next) => {
    const question = req.data;
    res.status(200).json({
        success: true,
        count: question.answers.length,
        data: question.answers
    })
});

const getSingleAnswer = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.data.answer
    });
});

const addAnswer = asyncHandler(async (req, res, next) => {
    const question = req.data;
    
    const answer = await Answer.create({
        ...req.body,
        user: req.user.id,
        question: question.id
    });

    res.status(200).json({
        success: true,
        data: answer
    });
});

const editAnswer = asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    var answer = req.data.answer;

    answer.content = content;    
    await answer.save();

    res.status(200).json({
        success: true,
        data: answer
    });
});

const deleteAnswer = asyncHandler(async (req, res, next) => {
    const answer = req.data.answer;
    await answer.delete();

    res.status(200).json({
        success: true,
        data: answer
    });
});

const likeAnswer = asyncHandler(async (req, res, next) => {
    const answer = req.data.answer;
    
    if (answer.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400));
    }

    answer.likes.push(req.user.id);
    await answer.save();

    res.status(200).json({
        success: true,
        data: answer
    });
});

const unlikeAnswer = asyncHandler(async (req, res, next) => {
    const answer = req.data.answer;
    const idx = answer.likes.indexOf(req.user.id);
    
    console.log(req.user.id, answer.likes, idx);

    if (idx !== -1) {
        answer.likes.splice(req.user.id, 1);
        await answer.save();
    }

    res.status(200).json({
        success: true,
        data: answer
    });
});

module.exports = {
    getAllAnswers,
    addAnswer,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    unlikeAnswer
}