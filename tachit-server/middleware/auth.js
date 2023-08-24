const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. take the token from the request
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied. No valid token");

    // 2. check the token
    const payload = jwt.verify(token, process.env.jwtKey);

    // 3. save the payload
    req.payload = payload;

    next();
  } catch (error) {
    res.status(400).send(error);
  }
};