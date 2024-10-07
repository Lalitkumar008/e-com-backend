const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const { route } = require("./ownersRouter");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productModel.find();
  //   console.log(products);
  res.render("shop", { products });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const { id } = req.params;
  user.cart.push(id);
  await user.save();
  res.redirect("/shop");
});
router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  res.render("cart", { user });
});

module.exports = router;
