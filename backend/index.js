require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const mainRouter = require("./routes");
const app = express();

app.use("/api/v1", mainRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connection to MongoDB");
  }
  app.listen(() => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}

main();
