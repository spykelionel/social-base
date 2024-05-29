const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const qs = require("querystring");
const fs = require("fs");
const path = require("path");
const config = require("./config/env.config");
const apiV1 = require("./docs");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const jobRouter = require("./routes/job.routes");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./../logs/access.log"),
  { flags: "a" }
);

app.use(
  cors({
    origin: "*", // switch to client[s] origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", true); // ?
app.set("query parser", (str) => {
  return qs.parse(str, {});
});

if (config.ENV === "prod") {
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :date[web]",
      { stream: accessLogStream }
    )
  );
} else {
  app.use(morgan("dev"));
}

app.use(
  "/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(apiV1, {
    customSiteTitle: "Social base | V1 | Documentation",
  })
);

app.use("/v1/users", userRouter);
app.use("/v1/posts", postRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/jobs", jobRouter);

app.get("/", (req, res) => {
  res.redirect("/v1/docs");
});

module.exports = app;
