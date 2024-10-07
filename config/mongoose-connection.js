MONGODB_URI =
  "mongodb+srv://lalitbhagwasia008:bhagwasia19@cluster0.imhtaue.mongodb.net/e-commerce?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const config = require("config");
// consfig will get URL value from develoepment or production depending on whcih phase we are working on
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mdb database,port running on 3000");
  })
  .catch((err) => console.log(err));
module.exports = mongoose.connection;
