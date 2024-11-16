require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { mainRouter } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connection to MongoDB");
  }
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}

main();
