const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// creating a user
const registerUser = async function (req, res) {
  try {
    const { email, fullName, password, phone, deliveryAddress } = req.body;
    console.log();
    const isUser = await userModel.findOne({ email });

    if (isUser) {
      return res.status(401).send({
        msg: "User alraedy registered",
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        let createdUser = await userModel.create({
          email,
          fullName,
          password: hash,
          phone,
          deliveryAddress,
        });
        let token = generateToken(createdUser);
        res.cookie("token", token);
        res
          .status(201)
          .json({ user: createdUser, msg: "succesfully created user" });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let isUser = await userModel.findOne({ email });
  if (!isUser)
    return res.status(400).send({ msg: "email or password is incorrect" });
  bcrypt.compare(password, isUser.password, (err, result) => {
    if (result) {
      console.log(isUser);
      let token = generateToken(isUser);
      res.cookie("token", token);
      res.status(200).json({
        msg: "Logged in successfully",
        token: generateToken(isUser),
        userId: isUser._id.toString(),
        username: isUser.fullName,
        msg2: req.body,
      });
    } else res.status(400).send({ msg: "email or password is incorrect" });
  });
};

const userInfo = (req, res) => {
  try {
    console.log("userInfooooooo", req.user);
    res.status(201).json({ userInfo: req.user, isLoggedIn: true });
  } catch (error) {}
};
module.exports = { registerUser, loginUser, userInfo };
