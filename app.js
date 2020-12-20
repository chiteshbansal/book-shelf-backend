const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");
const authRouter = require("./Routes/Auth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("req", req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS ,GET , PUT,PATCH,POST,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/Auth", authRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message: message, data: data });
});
mongoose
  .connect(
    "mongodb://chitesh:pass123@cluster0-shard-00-00.ulx1q.mongodb.net:27017,cluster0-shard-00-01.ulx1q.mongodb.net:27017,cluster0-shard-00-02.ulx1q.mongodb.net:27017/bookShelf?ssl=true&replicaSet=atlas-demxn2-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("connect");
    app.listen(3000);
  })
  .catch((error) => {
    console.log("inside the mongoose middleware", error);
  });
