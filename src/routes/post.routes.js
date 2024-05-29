const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  savePost,
  deleteSavedPost,
  likePost,
  deleteLikedPost,
} = require("../controllers/post.controller");
const { verify } = require("../middleware/auth");
const upload = require("./../config/multer.config");

const postRouter = require("express").Router({ strict: false });

postRouter
  .post("/create", verify, upload.single("attachment"), create)
  .put("/save/:post_id", verify, savePost)
  .delete("/save/:post_id", verify, deleteSavedPost)
  .put("/like/:post_id", verify, likePost)
  .delete("/like/:post_id", verify, deleteLikedPost)
  .get("/", getAll)
  .get("/:post_id", getOne)
  .delete("/:post_id", verify, deleteOne)
  .patch("/:post_id", verify, update);

module.exports = postRouter;
