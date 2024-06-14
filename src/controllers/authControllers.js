import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrapper.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import sendEmail from "../helpers/feedback.js";
import _ from "lodash";

export const register = errorWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const passHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: passHash,
  });

  console.log(newUser);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "120h",
  });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ token, user: { email, name: newUser.name } });
});

export const login = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const theme = user.theme;

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
  res.status(200).json({
    token,
    user: { email, theme, name: user.name, avatarURL: user.avatarURL },
  });
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

export const current = errorWrapper(async (req, res, next) => {
  const { id: userId } = req.user;
  const {name, email, avatarURL, thete, token} = await User.findById(userId);

  const boards = await Board.find({ userId });
  if (boards.length === 0) {
    return res.status(404).json({ message: "No boards found" });
  }

  const sortedBoards = _.orderBy(boards, [(obj) => obj.createdAt], ["asc"]).map(
    (b) => b.toObject()
  );

  const boardId = sortedBoards[0]._id;

  const tasks = await Task.find({ userId, boardId });
  const columns = await Column.find({ userId, boardId });

  const col = columns.map((c) => {
    return {
      ...c._doc,
      tasks: tasks.filter((t) => {
        return t.columnId.toString() === c._id.toString();
      }),
    };
  });

  const result = { name, email, avatarURL, thete, token, boards };
  sortedBoards[0].columns = col;
  result.boards = sortedBoards;
  res.json(result);
});

export const feedback = errorWrapper(async (req, res, next) => {
  const { email, message } = req.body;
  const taskProjectEmail = "taskpro.project@gmail.com";
  const verifyMail = {
    to: "lysbrodya@gmail.com",
    subject: "Mail support service",
    html: `<p>Mail from:</p><p style="color: green"> ${email}</p><p>message:</p><p style="color: red">${message}</p>`,
    text: `Mail from: ${email}.${message}`,
  };
  await sendEmail(verifyMail);
  res.status(200).send({
    message: "Your request is being processed, you will be contacted soon",
  });
});
