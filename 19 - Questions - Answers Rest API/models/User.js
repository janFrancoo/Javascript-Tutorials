const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Question = require("./Question");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please, provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please, provide an e-mail"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please, provide a valid e-mail"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: [
            "user",
            "admin"
        ]
    },
    password: {
        type: String,
        minlength: [6, "Please, provide a password with minimum length 6"],
        required: [true, "Please, provide a password"],
        select: false // hide passwords
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    avatar: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

UserSchema.methods.generateJWTFromUser = function() {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this._id,
        name: this.name,
        role: this.role
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });

    return token;
}

UserSchema.methods.getResetPasswordTokenFromUser = function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const { RESET_PWD_EXPIRE } = process.env;
    const resetPwdToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPwdToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PWD_EXPIRE);

    return resetPwdToken;
}

UserSchema.pre("save", function(next) {
    // Update user -> if password is not changed, do not execute hashing
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.post("remove", async function() {
    await Question.deleteMany({
        user: this._id
    });
});

module.exports = mongoose.model("User", UserSchema);
