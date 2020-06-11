const mongoose = require("mongoose");
const slugify = require('slugify');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please, provide a title"],
        minlength: [10, "Please, provide a title with minimum 10 chars"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "Please, provide content"],
        minlength: [20, "Please, provide content with minimum 20 chars"],
    },
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    answerCount: {
        type: Number,
        default: 0
    },
    answers: [{
        type: mongoose.Schema.ObjectId,
        ref: "Answer"
    }],
});

QuestionSchema.pre("save", function(next) {
    if (!this.isModified("title")) {
        next();
    }

    this.slug = this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug = function() {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false
      });
}

module.exports = mongoose.model("Question", QuestionSchema);