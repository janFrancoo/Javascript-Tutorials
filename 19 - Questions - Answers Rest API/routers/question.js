// /api/questions/
const express = require("express");
const { checkQuestionExists } = require("../middlewares/database/db_error_helper");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, 
        deleteQuestion, likeQuestion, unlikeQuestion } = require("../controllers/question");
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/auth/auth");
const answer = require("./answer");
const { questionQueryHelper, answerQueryHelper } = require("../middlewares/query/modelHelpers");
const Question = require("../models/Question");
const router = express.Router();

router.get("/", questionQueryHelper(Question, {
        population: {
                path: "user",
                select: "name avatar"
        }}), getAllQuestions);
router.get("/:id", [checkQuestionExists, answerQueryHelper(Question, {
        population: [{
                path: "user",
                select: "name avatar"
        }, {
                path: "answers",
                select: "content"
        }]
})], getSingleQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion);
router.get("/:id/unlike", [getAccessToRoute, checkQuestionExists], unlikeQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], deleteQuestion);
router.use("/:question_id/answers", checkQuestionExists, answer);

module.exports = router;