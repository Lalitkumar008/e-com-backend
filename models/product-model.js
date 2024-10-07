const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  stockLevel: {
    type: Number,
    default: 0,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: Buffer,
  },
});
module.exports = mongoose.model("product", productSchema);
