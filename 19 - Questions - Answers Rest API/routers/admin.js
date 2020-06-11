// /api/admin/
const express = require("express");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/auth/auth");
const { checkUserExists } = require("../middlewares/database/db_error_helper");
const { blockUser, deleteUser } = require("../controllers/admin");
const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);
router.get("/block/:id", checkUserExists, blockUser);
router.delete("/user/:id", checkUserExists, deleteUser);

module.exports = router;