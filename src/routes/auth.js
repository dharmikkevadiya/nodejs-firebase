const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { signup, login, getMe } = require("../controllers/auth.js");

//@route    POST /signup
//@desc     User signup
//@access   PUBLIC
router.post("/signup", signup.controller);

//@route    POST /login
//@desc     User login
//@access   PUBLIC
router.post("/login", login.controller);

//@route    GET /getMe
//@desc     Get Me
//@access   PUBLIC
router.get("/me", auth, getMe.controller);

module.exports = router;
