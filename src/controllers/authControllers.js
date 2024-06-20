import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrapper.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import queryString from "query-string";
import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import sendEmail from "../helpers/feedback.js";
import _ from "lodash";
import axios from "axios";

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

  if (!user || user.isGoogleAuth) {
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
    user: {
      email,
      theme: user.theme,
      name: user.name,
      avatarURL: user.avatarURL,
    },
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
  const { name, email, avatarURL, theme, token } = await User.findById(userId);

  let result;

  const boards = await Board.find({ userId });
  if (boards.length > 0) {
    const sortedBoards = _.orderBy(
      boards,
      [(obj) => obj.createdAt],
      ["asc"]
    ).map((b) => b.toObject());

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

    result = { name, email, avatarURL, theme, token, boards };
    sortedBoards[0].columns = col;
    result.boards = sortedBoards;
  } else {
    result = { name, email, avatarURL, theme, token, boards: [] };
  }

  res.json(result);
});

export const feedback = errorWrapper(async (req, res) => {
  const { email, message } = req.body;
  const taskProjectEmail = "taskpro.project@gmail.com";
  const verifyMail = {
    to: taskProjectEmail,
    subject: "Mail support service",
    html: `<p>Mail from:</p><p style="color: green"> ${email}</p><p>message:</p><p style="color: red">${message}</p>`,
    text: `Mail from: ${email}.${message}`,
  };
  await sendEmail(verifyMail);
  res.status(200).send({
    message: "Your request is being processed, you will be contacted soon",
  });
});

export const googleAuth = errorWrapper(async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
});

export const googleRedirect = errorWrapper(async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  let user = await User.findOne({ email: userData.data.email });

  if (!user) {
    user = await User.create({
      email: userData.data.email,
      name: userData.data.name,
      isGoogleAuth: true,
      password: "GoogleAuth",
    });
  }

  if (!user.isGoogleAuth) {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/login`);
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "120h",
  });

  await User.findByIdAndUpdate(user._id, { token: accessToken }, { new: true });

  return res.redirect(
    `${process.env.FRONTEND_URL}/google/auth?accessToken=${accessToken}`
  );
});
