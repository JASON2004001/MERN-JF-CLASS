import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (!user.isPasswordCorrect(password)) {
    return res
      .status(400)
      .json({ message: "Either email or password is incorrect" });
  }

  const token = jwt.sign(
    {
      user_id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  user.refreshToken = token;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({ message: "User logged in successfully", user });
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.user_id,
      { $set: { token: undefined } },
      { returnDocument: "after" },
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .json({ msg: "User Loggeg Out Successfully" });
  } catch (error) {
    console.log("Error while creating User", error);
  }
};

export { registerUser, loginUser, logoutUser };
