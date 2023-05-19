const logger = require("../config/logger.config");
const Job = require("../models/Job");
const User = require("../models/User");

module.exports = {
  create: async (req, res) => {
    const user = req.user;
    try {
      const job = new Job({
        ...req.body,
        authorId: user._id,
      });
      await job
        .save()
        .then((result) => {
          return res.status(201).json(result);
        })
        .catch((err) => {
          return res.status(501).json(err);
        });
    } catch (error) {
      logger.error(error);
      return res.status(501).json(error);
    }
  },

  getAll: async (req, res) => {
    await Job.find({})
      .lean()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(503).json(err));
  },

  getOne: async (req, res) => {
    try {
      await Job.findOne({ _id: req.params.job_id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          }
          return res.status(404).json({
            message: "Job Not found",
          });
        })
        .catch((err) => {
          logger.error(err);
          return res.status(501).json({
            ...err,
            info: "Server Error",
          });
        });
    } catch (error) {
      res.status(501).json({
        ...error,
        info: "Server Error. Error getting the Job",
      });
    }
  },

  deleteOne: async (req, res) => {
    await Job.deleteOne({ _id: req.params.job_id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        }
        res.status(404).json({
          message: "Job Not found",
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
    await Job.deleteMany({})
      .then((result) =>
        res.status(200).json({ ...result, info: "deleted all Jobs" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Job?.exists({ _id: req.params.job_id })
      .then(async (result) => {
        if (result) {
          try {
            await Job.updateOne(
              { _id: req.params.job_id },
              {
                $set: req.body,
              },
              { new: true }
            )
              .then((result) =>
                res.status(201).json({
                  ...result,
                  info: "successfully updated Job",
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
      .catch((err) => console.error(err));
  },

  saveJob: async (req, res) => {
    const user = req.user;
    const { job_id } = req.params;
    try {
      logger.info(user);
      await User.updateOne(
        { _id: user.id },
        {
          $push: { savedJobs: job_id },
        },
        { new: true }
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's saved Job",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },

  deleteSavedJob: async (req, res) => {
    const user = req.user;
    const { job_id } = req.params;
    try {
      logger.info(user);
      await User.updateOne(
        { _id: user.id },
        {
          $pull: { savedJobs: job_id },
        }
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's saved Job",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },
};
