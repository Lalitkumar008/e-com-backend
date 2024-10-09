const { default: Stripe } = require("stripe");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
    const { id } = req.params;

    const singleProduct = await productModel.find({ _id: id });
    if (singleProduct) {
      //   const plainProducts = allProducts.map((product) => product._doc);
      const productsWithImage = singleProduct.map((product) => {
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
    const { userId, token } = req.query;
    console.log("idd>>", userId, token);
    const isUser = await userModel.findOne({ _id: userId });
    // const isProduct = await productModel.findOne({ _id: id });
    if (!isUser) {
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
    const { id } = req.params;
    console.log(req.params.id);
    const deletedUser = await productModel.deleteOne({ _id: id });

    if (!deletedUser) {
      return res.status(401).json({ message: "couldn't delete contact" });
    }

    res.status(201).json({ message: "product deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const makePayment = async (req, res) => {
  try {
    // console.log("payment working");
    // const { products } = req.body;
    // console.log("Products:", Object.values(products));

    // const lineItems = Object.values(products)?.map((product) => ({
    //   price_data: {
    //     currency: "inr",
    //     product_data: {
    //       name: product.productName,
    //       // images: [product.productImage], // Ensure images is an array
    //     },
    //     unit_amount: Math.round(product.productPrice * 100),
    //   },
    //   quantity: product.quantity || 1, // Provide a default quantity if not present
    // }));

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: lineItems,
    //   mode: "payment",
    //   success_url: "http://localhost:5173/",
    //   cancel_url: "http://localhost:5173/",
    // });

    res.status(201).json({ msg: "payment succesful" });
  } catch (error) {
    console.log("Error creating Stripe session:", error);
    res.status(500).send("Payment failed");
  }
};

module.exports = {
  getAllProducts,
  deleteProductById,
  getSingleProduct,
  addToCart,
  showCartItems,
  makePayment,
};
