const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register")
const login = require("./routes/login")
const profile = require("./routes/profile")
const product = require("./routes/product")
const carts = require("./routes/carts")
const cors = require("cors")

const PORT = process.env.PORT ||4501;
const app = express();


mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  app.use(express.json());
  app.use(cors());
  app.use("/api/register",register);
  app.use("/api/login",login);
  app.use("/api/profile",profile);
  app.use("/api/product",product);
  app.use("/api/carts",carts);

  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});