const { Router } = require("express");
const accountRouter = Router();
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

module.exports = {
  accountRouter: accountRouter,
};
