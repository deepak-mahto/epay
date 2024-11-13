const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    msg: "hi there",
  });
});

module.exports = {
  userRouter: userRouter,
};
