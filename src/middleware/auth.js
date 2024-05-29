const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env.config");
const logger = require("../config/logger.config");
const User = require("../models/User");

const login = async (req, res) => {
  const client = req.body;
  await User.findOne({ email: client.email }).then((user) => {
    console.log(client);
    if (user) {
      logger.info(user);
      // check password
      bcrypt.compare(client.password, user.password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed",
            value: error,
          });
        }
        const token = jwt.sign(
          {
            user: user.email,
            id: user._id,
          },
          config.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.status(201).json({
          message: "Auth Successful",
          token,
          ...user["_doc"],
          password: undefined,
          ACK: result,
        });
      });
    }
  });
};
const verify = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (error) {
    logger.error("Error verifying user", error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

module.exports = { login, verify };
