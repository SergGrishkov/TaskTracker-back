import { errorWrapper } from "../helpers/Wrapper.js";
import path from "path";
import User from "../models/User.js";
import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";
import { uploadToCloudinary } from "../helpers/upload.js";

export const changeTheme = errorWrapper(async (req, res) => {
  const { theme } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    throw HttpError(404, "No user with such ID");
  }

  const {
    name,
    email,
    theme: them,
    token,
    avatarURL,
  } = await User.findByIdAndUpdate(id, { theme }, { new: true });

  res.json({ name, email, theme: them, token, avatarURL });
});

export const updateUser = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { name, email, password } = req.body;
  const file = req.file;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    throw HttpError(404, "No user with such ID");
  }

  let updatedUser;

  if (!file) {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password,
      },
      { new: true }
    );
  } else {
    const avatar = await uploadToCloudinary(file.buffer);

    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password,
        avatarURL: avatar.secure_url,
      },
      { new: true }
    );
  }
  delete updateUser.password;
  
  res.json(updatedUser);
});
