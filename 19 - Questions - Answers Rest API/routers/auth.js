// /api/auth/
const express = require("express");
const { register, getUser, login, logout, imgUpload, forgotPwd, resetPwd, editUserFeatures } = require("../controllers/auth"); 
const { getAccessToRoute } = require("../middlewares/auth/auth");
const avatarUpload = require("../middlewares/libraries/avatarUpload");

const router = express.Router();

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.post("/upload", [getAccessToRoute, avatarUpload.single("profile_image")], imgUpload);
router.post("/forgotPwd", forgotPwd);
router.put("/resetPwd", resetPwd);
router.put("/edit", getAccessToRoute, editUserFeatures);

module.exports = router;