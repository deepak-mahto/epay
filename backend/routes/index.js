const { Router } = require("express");
const mainRouter = Router();
const { userRouter } = require("./user");

mainRouter.use("/user", userRouter);

module.exports = {
  mainRouter,
};
