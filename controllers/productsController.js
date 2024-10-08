const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    if (allProducts) {
      //   const plainProducts = allProducts.map((product) => product._doc);
      const productsWithImage = allProducts.map((product) => {
        return {
          ...product._doc,
          productImage: product.productImage
            ? product.productImage.toString("base64")
            : null, // Convert Buffer to Base64
        };
      });
      res.json({
        data: productsWithImage,
        msg: "fetched all products succesfully",
      });
    } else {
      res.status(401).json({ msg: "products not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const getSingleProduct = async (req, res) => {
  try {
    // const {id}=req.body

    const singleProduct = await productModel.find({ _id: id });
    if (allProducts) {
      //   const plainProducts = allProducts.map((product) => product._doc);
      const productsWithImage = allProducts.map((product) => {
        return {
          ...product._doc,
          productImage: product.productImage
            ? product.productImage.toString("base64")
            : null, // Convert Buffer to Base64
        };
      });
      res.json({
        data: productsWithImage,
        msg: "fetched single product succesfully",
      });
    } else {
      res.status(401).json({ msg: "products not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const addToCart = async (req, res) => {
  try {
    // id for product id
    // userid for user's Id
    const userid = req.body.headers;
    const id = req.body.params;

    const isUser = await userModel.findOne({ _id: userid });
    const isProduct = await productModel.findOne({ _id: id });

    if (!userid || !isUser) {
      return res.status(401).json({
        msg: "login first",
      });
    }
    isUser.cart?.push(isProduct);
    await isUser.save();
    res.status(201).json({
      msg: "added to cart",
    });
  } catch (error) {
    console.log(error);
  }
};
const showCartItems = async (req, res) => {
  try {
    // id for product id
    // userid for user's Id
    const userid = req.headers.userid;

    const isUser = await userModel.findOne({ _id: userid });
    // const isProduct = await productModel.findOne({ _id: id });
    if (!userid) {
      return res.status(401).json({
        msg: "login first",
      });
    }

    const cartProducts = await productModel.find({ _id: { $in: isUser.cart } });
    const cartProductsWithImage = cartProducts.map((product) => {
      return {
        ...product._doc,
        productImage: product.productImage
          ? product.productImage.toString("base64")
          : null, // Convert Buffer to Base64
      };
    });
    res.status(201).json({
      msg: "fetched cart items",
      cartItems: cartProductsWithImage,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete contcat by id
const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.body;

    const deletedUser = await productModel.deleteOne({ _id: productId });

    if (!deletedUser) {
      return res.status(401).json({ message: "couldn't delete contact" });
    }

    res.status(201).json({ message: "product deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllProducts,
  deleteProductById,
  getSingleProduct,
  addToCart,
  showCartItems,
};
