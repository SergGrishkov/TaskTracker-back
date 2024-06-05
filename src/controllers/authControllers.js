import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrappre.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import crypto from "crypto";
import sendVerificationToken from "../helpers/sendVerificationToken.js";

export const register = errorWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const passHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = User.create({
    name,
    email,
    password: passHash,
    avatarURL,
  });

  res.status(201).json({ user: { name, email } });
});

export const login = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isCompare = await bcrypt.compare(password, user.password);

  if (!isCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "120h",
  });

  await User.findByIdAndUpdate(user._id, { token });
  res
    .status(200)
    .json({ token, user: { email } });
});

export const logout = errorWrapper(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).end();
});


export const verifyEmail = errorWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
});

export const resendVerifyEmail = errorWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationToken = crypto.randomUUID();
  user.verificationToken = verificationToken;
  await user.save();

  await sendVerificationToken(email, user.verificationToken);
  res.json({
    message: "Verify email sent",
  });
});
