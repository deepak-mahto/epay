const { Router } = require("express");
const userRouter = Router();

userRouter.get("/signup", (req, res) => {
  res.json({
    msg: "You are signed up",
  });
});

module.exports = {
  userRouter,
};
