const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-router");
const todoRouter = require("./routes/todo-router");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const compression = require("compression");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(compression());

if (process.env.NODE_ENV === "production") {
  // server static content
}
app.use(express.static(path.join(__dirname, "client/build")));

// routes

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

// start server

app.listen(PORT, () => {
  console.log(`server start at port: ${PORT}`);
});
