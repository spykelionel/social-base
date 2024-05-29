const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} = require("../controllers/user.controller");
const { verify, login } = require("../middleware/auth");

const userRouter = require("express").Router({ strict: false });

userRouter
  .post("/create", create)
  .post("/auth/login", login)
  .get("/", verify, getAll)
  .get("/:user_id", verify, getOne)
  .delete("/:user_id", verify, deleteOne)
  .patch("/:user_id", verify, update);

module.exports = userRouter;
