const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userInfo,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userinfo", isLoggedIn, userInfo);
module.exports = router;
