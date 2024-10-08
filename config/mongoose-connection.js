const mongoose = require("mongoose");
const config = require("config");
// consfig will get URL value from develoepment or production depending on whcih phase we are working on
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mdb database,port running on 3000");
  })
  .catch((err) => console.log(err));
module.exports = mongoose.connection;
