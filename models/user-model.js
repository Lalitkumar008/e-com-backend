const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  deliveryAddress: {
    type: String,
  },

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  picture: String,
});
module.exports = mongoose.model("user", userSchema);
