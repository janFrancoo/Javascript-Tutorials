// /api/user/
const express = require("express");
const { getSingleUser, getAllUsers } = require("../controllers/user");
const router = express.Router();
const { checkUserExists } = require("../middlewares/database/db_error_helper");
const { userQueryHelper } = require("../middlewares/query/modelHelpers");
const User = require("../models/User");

router.get("/", userQueryHelper(User), getAllUsers);
router.get("/:id", checkUserExists, getSingleUser);

module.exports = router;