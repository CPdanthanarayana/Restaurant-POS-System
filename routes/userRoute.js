const express = require("express");
const { register, login, getUserData } = require("../controllers/userControllers");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Authentication Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isVerifiedUser,getUserData);

module.exports = router;
