const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  saveJob,
  deleteSavedJob,
} = require("../controllers/job.controller");
const { verify } = require("../middleware/auth");

const jobRouter = require("express").Router({ strict: false });

jobRouter
  .post("/create", verify, create)
  .put("/save/:job_id", verify, saveJob)
  .delete("/save/:job_id", verify, deleteSavedJob)
  .get("/", getAll)
  .get("/:job_id", getOne)
  .delete("/:job_id", verify, deleteOne)
  .patch("/:job_id", verify, update);

module.exports = jobRouter;
