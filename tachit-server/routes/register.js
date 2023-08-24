const express = require("express");
const joi = require("joi");
const User = require("../moduls/User");
const Cart = require("../moduls/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  isAdmin: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    // 1. joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    // 2. check if user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    // 3. create the user
    user = new User(req.body);

    // 4. encrypt the password & save user
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

 // 5. create user cart
    let cart = new Cart({ userId: user._id, products: [], active: true });

    await cart.save();

    // 6. create the token & response
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, email:user.email },
      process.env.jwtKey
    );

    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
