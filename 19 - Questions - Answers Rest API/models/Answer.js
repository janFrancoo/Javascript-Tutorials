const mongoose = require("mongoose");
const Question = require("./Question");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please, provide content"],
        minlength: [10, "Minimum 10 chars is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    }
});

// Answer can be saved to question in just pre hook
// But if answer is saved to question and could not be saved
// to answers self, it will be meaningless
AnswerSchema.pre("save", async function(next) {
    this.isThisDocNew = true;
    if (!this.isModified("user")) {
        this.isThisDocNew = false;
    }
    next();
});

AnswerSchema.post("save", async function(doc) {
    if (this.isThisDocNew) {
        await Question.findByIdAndUpdate(doc.question, {
            $push: {
                "answers": doc._id
            },
            $inc: {
                "answerCount": 1
            }
        });
    }
});

AnswerSchema.post("remove", async function(doc) {
    const question = await Question.findById(doc.question);
    question.answers.splice(question.answers.indexOf(doc._id), 1);
    question.answerCount -= 1;
    await question.save();
});

module.exports = mongoose.model("Answer", AnswerSchema);