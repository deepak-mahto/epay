const { Router } = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { z } = require("zod");
const { authMiddleware } = require("../middleware");
const userRouter = Router();

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  const { firstName, lastName, username, password } = req.body;

  try {
    if (!success) {
      return res.status(411).json({
        message: "Inputs are incorrect",
      });
    }
    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  try {
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const user = await User.findOne({
      username: req.body.username,
    });

    const password = req.body.password;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
      return;
    }

    res.status(411).json({
      message: "Error while logging in",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json("Error while updating information");
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = {
  userRouter: userRouter,
};
