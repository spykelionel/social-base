const mongoose = require("mongoose");
const logger = require("./logger.config");
const { MONGODB_URI } = require("./env.config");

const initDB = (() => {
  mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((succ) => {
      logger.info("Connected successsfully to mongoDB");
    })
    .catch(async (err) => {
      logger.error("Couldn't connnect mongoDB");
      logger.error(err?.stack);
    });
});
module.exports = initDB;
