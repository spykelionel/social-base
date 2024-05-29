const bcrypt = require("bcrypt");
const User = require("../models/User");
const logger = require("../config/logger.config");

module.exports = {
  create: async (req, res) => {
    User?.exists({ email: req.body.email })
      .then(async (result) => {
        if (!result) {
          try {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
              if (err) {
                logger.error(req.body);
                return res.status(500).json({
                  status: err.name,
                  message: err.message,
                });
              }
              const user = new User({
                ...req.body,
                password: hash,
              });
              await user
                .save()
                .then((result) => {
                  return res.status(201).json(result);
                })
                .catch((err) => {
                  return res.status(501).json(err);
                });
            });

            logger.info({ ...req.body, password: "....0.A$..(3>." });
          } catch (error) {
            logger.error(error);
          }
        } else {
          res.status(409).json({
            message: "Resource Exist",
          });
        }
      })
      .catch((err) => logger.error(err));
  },

  getAll: async (req, res) => {
    await User.find()
      .lean()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(503).json(err));
  },

  getOne: async (req, res) => {
    logger.info(req.params);
    try {
      await User.findOne({ _id: req.params.user_id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          }
          return res.status(404).json({
            message: "User Not found",
          });
        })
        .catch((err) => {
          return res.status(501).json({
            ...err,
            info: "Server Error",
          });
        });
    } catch (error) {
      new Error(error);
      res.status(501).json({
        ...error,
        info: "Server Error. Error getting the user",
      });
    }
  },

  deleteOne: async (req, res) => {
    await User.deleteOne({ _id: req.params.user_id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        }
        res.status(404).json({
          message: "User Not found",
        });
      })
      .catch((err) =>
        res.status(501).json({
          ...err,
          message: "Not found",
        })
      );
  },

  deleteAll: async (req, res) => {
    await User.deleteMany({})
      .then((result) =>
        res.status(200).json({ ...result, info: "deleted all Users" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    User?.exists({ _id: req.params.user_id })
      .then(async (result) => {
        if (result) {
          try {
            await User.updateOne(
              { _id: req.params.user_id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).json({
                  ...result,
                  info: "successfully updated User",
                })
              )
              .catch((err) => res.status(409).json(err));
          } catch (error) {
            logger.info(error);
          }
        } else {
          res.status(404).json({
            info: { message: "Resource Doesn't Exist", valid: false },
          });
        }
      })
      .catch((err) => logger.error(err));
  },
};
