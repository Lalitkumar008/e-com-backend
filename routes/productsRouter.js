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
  makePayment,
} = require("../controllers/productsController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
router.post("/create", upload.single("productImage"), async (req, res) => {
  try {
    console.log(req.body);
    console.log("files>>>>>", req.file);
    const {
      productName,
      productPrice,
      stockLevel,
      productMrp,
      productDescription,
      bgColor,
      panelColor,
      productColor,
      productCategory,
    } = req.body;
    const product = await productModel.create({
      productImage: req.file ? req.file.buffer : null,
      productName,
      productPrice,
      stockLevel,
      productDescription,
      productMrp,
      bgColor,
      panelColor,
      productColor,
      productCategory,
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
router.get("/singleproduct/:id", getSingleProduct);
router.post("/deleteproduct/:id", deleteProductById);
router.post("/product/:id", getSingleProduct);
router.post("/addtocart", addToCart);
router.get("/mycart", isLoggedIn, showCartItems);
router.post("/create-checkout-session", makePayment);
module.exports = router;
