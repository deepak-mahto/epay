const { Router } = require("express");
const mainRouter = Router();
const { userRouter } = require("./user");
const { accountRouter } = require("./accounts");

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);

module.exports = {
  mainRouter,
};
