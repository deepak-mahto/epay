const { Router } = require("express");
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const accountRouter = Router();

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
  try {
    await session.withTransaction(async () => {
      const { amount, to } = req.body;

      const account = await Account.findOne({
        userId: req.userId,
      }).session(session);

      if (!account || account.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
        throw new Error("Invalid account");
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);

      await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
      ).session(session);
    });

    res.json({ message: "Transfer successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = { accountRouter };
