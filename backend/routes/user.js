const { Router } = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = require("../config");
const zod = require("zod");
const userRouter = Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string,
  password: zod.string,
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken or inputs are incorrect",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken or inputs are incorrect",
    });
  }

  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await User.create({
    username: username,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });

  const userId = user._id;

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
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

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
});

module.exports = {
  userRouter,
};
