const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const isLoggedIn = async (req, res, next) => {
  const { authorization, userId } = req.headers;
  console.log("tokenn", authorization, userId);
  if (!authorization) {
    // res.redirect("/");
    return res.send("please login first");
  } else {
    try {
      let decoded = jwt.verify(authorization, process.env.JWT_KEY);
      console.log("decoded", decoded);
      let user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");
      req.user = user;
    } catch (err) {
      // res.redirect("/");
      console.log(err);
      res.send(err.message);
    }
    next();
  }
};
module.exports = { isLoggedIn };
