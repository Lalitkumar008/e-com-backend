const productModel = require("../models/product-model");

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

// delete contcat by id
const deleteProductById = async (req, res) => {
  const { productId } = req.body;
  console.log(req.body);
  const deletedUser = await productModel.deleteOne({ _id: productId });

  if (!deletedUser) {
    return res.status(401).json({ message: "couldn't delete contact" });
  }
  console.log(deletedUser);
  res.status(201).json({ message: "product deleted succesfully" });
};
module.exports = { getAllProducts, deleteProductById };
