const logger = require("../config/logger.config");
const Comment = require("../models/Comment");

module.exports = {
  create: async (req, res) => {
    const user = req.user;
    try {
      const comment = new Comment({
        ...req.body,
        authorId: user.id,
      });
      await comment
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
    await Comment.find({})
      .lean()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(503).json(err));
  },

  getOne: async (req, res) => {
    try {
      await Comment.findOne({ _id: req.params.comment_id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          }
          return res.status(404).json({
            message: "Comment Not found",
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
        info: "Server Error. Error getting the Comment",
      });
    }
  },

  deleteOne: async (req, res) => {
    await Comment.deleteOne({ _id: req.params.comment_id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        }
        res.status(404).json({
          message: "Comment Not found",
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
    await Comment.deleteMany({})
      .then((result) =>
        res.status(200).json({ ...result, info: "deleted all Comments" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Comment?.exists({ _id: req.params.comment_id })
      .then(async (result) => {
        if (result) {
          try {
            await Comment.updateOne(
              { _id: req.params.comment_id },
              {
                $set: req.body,
              },
              { new: true }
            )
              .then((result) =>
                res.status(201).json({
                  ...result,
                  info: "successfully updated Comment",
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

  likeComment: async (req, res) => {
    const user = req.user;
    const { comment_id } = req.params;
    try {
      logger.info(user);
      await Comment.updateOne(
        { _id: comment_id },
        {
          $push: { likes: user.id },
        },
        { new: true }
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's liked Comment",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },

  deleteLikedComment: async (req, res) => {
    const user = req.user;
    const { comment_id } = req.params;
    try {
      logger.info(user);
      await Comment.updateOne(
        { _id: comment_id },
        {
          $pull: { likes: user.id },
        },
        { new: true }
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's liked Comment",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },
};
