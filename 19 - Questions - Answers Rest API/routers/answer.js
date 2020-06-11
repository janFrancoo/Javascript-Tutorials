// /api/questions/<question_id>/answers
const express = require("express");
const { getAllAnswers, addAnswer, getSingleAnswer, editAnswer, deleteAnswer, 
        likeAnswer, unlikeAnswer } = require("../controllers/answer");
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middlewares/auth/auth");
const { checkAnswerExists } = require("../middlewares/database/db_error_helper");
const router = express.Router({mergeParams: true});

router.get("/", getAllAnswers);
router.get("/:answer_id", checkAnswerExists, getSingleAnswer);
router.get("/:answer_id/like", [getAccessToRoute, checkAnswerExists], likeAnswer);
router.get("/:answer_id/unlike", [getAccessToRoute, checkAnswerExists], unlikeAnswer);
router.post("/add_answer", getAccessToRoute, addAnswer);
router.put("/:answer_id/edit", [getAccessToRoute, checkAnswerExists, getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete", [getAccessToRoute, checkAnswerExists, getAnswerOwnerAccess], deleteAnswer);

module.exports = router;