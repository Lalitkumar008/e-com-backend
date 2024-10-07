const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  gstIn: {
    type: Number,
  },
  products: {
    type: Array,
    default: [],
  },
  picture: String,
});
module.exports = mongoose.model("owner", ownerSchema);
