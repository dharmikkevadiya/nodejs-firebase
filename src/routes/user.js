const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  uploadAvatar,
  getAvatar,
} = require("../controllers/user.js");
const { uploadProfilePhotoMiddleware } = require("../helper/FileStorage");

//@route    GET /users
//@desc     Get all users
//@access   PRIVATE
router.get("/users", auth, getAllUsers.controller);

//@route    GET /users/id
//@desc     Get singl user
//@access   PRIVATE
router.get("/users/:id", auth, getSingleUser.controller);

//@route    PUT /users/:id
//@desc     Update user
//@access   PRIVATE
router.put("/users/:id", auth, updateUser.controller);

//@route    PUT /users/:id
//@desc     Delete user
//@access   PRIVATE
router.delete("/users/:id", auth, deleteUser.controller);

//@route    PUT /users/:id/avatar
//@desc     Upload user avataar
//@access   PRIVATE
router.put(
  "/users/:id/avatar",
  auth,
  uploadProfilePhotoMiddleware,
  uploadAvatar.controller
);

//@route    GET /users/:id/avatar
//@desc     GET user avataar
//@access   PRIVATE
router.get("/users/:id/avatar", auth, getAvatar.controller);

module.exports = router;
