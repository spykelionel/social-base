const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  savecomment,
  deleteLikedComment,
  likeComment,
} = require("../controllers/comment.controller");
const { verify } = require("../middleware/auth");

const commentRouter = require("express").Router({ strict: false });

commentRouter
  .post("/create", verify, create)
  .put("/like/:comment_id", verify, likeComment)
  .delete("/like/:comment_id", verify, deleteLikedComment)
  .get("/", verify, getAll)
  .get("/:comment_id", verify, getOne)
  .delete("/:comment_id", verify, deleteOne)
  .patch("/:comment_id", verify, update);

module.exports = commentRouter;
