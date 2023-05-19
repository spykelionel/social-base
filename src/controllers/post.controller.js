const logger = require("../config/logger.config");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  create: async (req, res) => {
    const user = req.user;
    try {
      const post = new Post({
        ...req.body,
        authorId: user._id,
        attachment: req?.file?.path ?? undefined,
      });
      await post
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
    await Post.find({})
      .lean()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(503).json(err));
  },

  getOne: async (req, res) => {
    try {
      await Post.findOne({ _id: req.params.post_id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          }
          return res.status(404).json({
            message: "Post Not found",
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
        info: "Server Error. Error getting the Post",
      });
    }
  },

  deleteOne: async (req, res) => {
    await Post.deleteOne({ _id: req.params.post_id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        }
        res.status(404).json({
          message: "Post Not found",
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
    await Post.deleteMany({})
      .then((result) =>
        res.status(200).json({ ...result, info: "deleted all posts" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Post?.exists({ _id: req.params.post_id })
      .then(async (result) => {
        if (result) {
          try {
            await Post.updateOne(
              { _id: req.params.post_id },
              {
                $set: req.body,
              },
              { new: true }
            )
              .then((result) =>
                res.status(201).json({
                  ...result,
                  info: "successfully updated Post",
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

  savePost: async (req, res) => {
    const user = req.user;
    const { post_id } = req.params;
    try {
      logger.info(user)
      await User.updateOne(
        { _id: user.id },
        {
          $push: { "savedPosts": post_id },
        },
        {new: true}
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's saved post",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },

  deleteSavedPost: async (req, res) => {
    const user = req.user;
    const { post_id } = req.params;
    try {
      logger.info(user)
      await User.updateOne(
        { _id: user.id },
        {
          $pull: { "savedPosts": post_id },
        },
      )
        .then((result) => {
          logger.info(result);
          res.status(201).json({
            ...result,
            info: "successfully updated User's saved post",
          });
        })
        .catch((err) => res.status(501).json(err));
    } catch (error) {
      logger.info(error);
    }
  },
};
