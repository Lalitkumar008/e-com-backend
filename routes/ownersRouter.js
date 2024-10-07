const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.post("/create", async (req, res) => {
  const { fullName, email, password } = req.body;
  const owner = await ownerModel.find();
  console.log("owner", owner);
  if (owner.length > 0) {
    return res.status(501).send("permission not granted");
  }
  const createdOwner = await ownerModel.create({ email, fullName, password });
  console.log("createdOwner", createdOwner);
  res.send(createdOwner);
});
router.get("/admin", (req, res) => {
  // let successMsg = flash("success");
  console.log("admin route hit");
  res.render("createProducts");
});
module.exports = router;
