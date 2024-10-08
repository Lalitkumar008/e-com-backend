const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
// Load environment variables from .env file
require("dotenv").config();

// cors errors
const origin = "http://localhost:5173";
// const origin = "https://stellular-concha-7615b9.netlify.app";
var corsOptions = {
  origin: origin,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// middlewares
// Increase JSON request size limit to 10MB (or adjust as needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");

// utils
const isLoggedIn = require("./middlewares/isLoggedIn");

// database
const db = require("./config/mongoose-connection");
// routes
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(3000);
