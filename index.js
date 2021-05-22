const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./src/routes");
require("dotenv").config();

//using this to define a particular directory
const requireDir = require("require-dir");

//MIDDLEWARES
app.use(express.json());
app.use(cors());
//folder to create our models
requireDir("./src/models");
app.use("/api", routes);

//URL of the database
const DB_CONNECT = process.env.DB_CONNECT;
const PORT = process.env.PORT || 5001;

//connect to database
mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//Test the connection
let db = mongoose.connection;

db.on("error", function (error) {
  console.log(error);
});
db.once("open", function (callback) {
  console.log("Connection to Database Successful!");
});

app.listen(PORT, function () {
  console.log("Now listening for request at port: " + PORT);
});
