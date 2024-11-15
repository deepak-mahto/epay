const { Router } = require("express");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const zod = require("zod");
const userRouter = Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string,
  password: zod.string,
});

userRouter.get("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Email already taken or inputs are incorrect",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    res.status(411).json({
      message: "Email already taken or inputs are incorrect",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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

module.exports = {
  userRouter,
};
