const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  savePost,
  deleteSavedPost,
} = require("../controllers/post.controller");
const { verify, } = require("../middleware/auth");

const postRouter = require("express").Router({ strict: false });

postRouter
  .post("/create", verify, create)
  .put("/save/:post_id", verify, savePost)
  .delete("/save/:post_id", verify, deleteSavedPost)
  .get("/", verify, getAll)
  .get("/:post_id", verify, getOne)
  .delete("/:post_id", verify, deleteOne)
  .patch("/:post_id", verify, update);

module.exports = postRouter;
