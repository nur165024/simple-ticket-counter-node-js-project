const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const databaseConnection = require("../config/dbConnection");

const app = express();
app.use([
  morgan("dev"),
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
]);
databaseConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/page", (req, res) => {
  res.send("this is our dynamic pages");
});

app.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).send(`<h1>${error.message}</h1>`);
  }

  res.status(500).send(`<h1>SomeThings went wrong</h1>`);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
