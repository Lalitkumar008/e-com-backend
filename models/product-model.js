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
  productMrp: {
    type: Number,
  },
  bgColor: {
    type: String,
  },
  panelColor: {
    type: String,
  },
  productColor: {
    type: String,
  },
  productCategory: {
    type: String,
  },
});
module.exports = mongoose.model("product", productSchema);
