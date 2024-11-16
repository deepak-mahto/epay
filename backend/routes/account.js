const { Router } = require("express");
const accountRouter = Router();
const mongoose = require("mongoose");
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

accountRouter.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.findOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.findOne({ userId: to }, { $inc: { balance: amount } }).session(
    session
  );
});

await session.commitTransaction();
res.json({
  message: "Transfer successful",
});

module.exports = {
  accountRouter: accountRouter,
};
