const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const {
  getAllProducts,
  deleteProductById,
  getSingleProduct,
  addToCart,
  showCartItems,
} = require("../controllers/productsController");
router.post("/create", upload.single("productImage"), async (req, res) => {
  try {
    console.log(req.body);
    console.log("files>>>>>", req.file);
    const { productName, productPrice, stockLevel, productDescription } =
      req.body;
    const product = await productModel.create({
      productImage: req.file ? req.file.buffer : null,
      productName,
      productPrice,
      stockLevel,
      productDescription,
    });
    console.log("product route hit");
    res.send({
      msg: "product added successfully",
    });
    // req.flash("success", "Product created successfully");
    // res.redirect("/owners/admin");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
router.get("/allproducts", getAllProducts);
router.post("/deleteproduct", deleteProductById);
router.post("/product/:id", getSingleProduct);
router.post("/addtocart", addToCart);
router.get("/mycart", showCartItems);
module.exports = router;
