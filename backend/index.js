require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT);
}

main();
