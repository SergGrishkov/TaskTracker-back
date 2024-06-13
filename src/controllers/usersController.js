import { errorWrapper } from "../helpers/Wrapper.js";
import path from "path";
import User from "../models/User.js";
import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";

export const updateAvatar = errorWrapper(async (req, res) => {
  const { id, avatarURL: oldAvatarURL } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarsDir = path.resolve("public", "avatars");

  const avatarName = `${id}avatar${path.extname(originalname)}`;
  const resultUpload = path.resolve(avatarsDir, avatarName);
  await resizeImage(tempUpload, 250, 250);
  await deleteAvatar(oldAvatarURL);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", avatarName);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { avatarURL },
    { new: true }
  );
  if (!updatedUser) {
    throw HttpError(401);
  }
  res.status(200).json({
    avatarURL,
  });
});


async function resizeImage(imagePath, width, height) {
  const image = await Jimp.read(imagePath);
  image.resize(width, height);
  await image.writeAsync(imagePath);
}

export const changeTheme = errorWrapper(async (req, res) => {
  const { theme } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    throw HttpError(404, "No user with such ID");
  }

  const newUser = await User.findByIdAndUpdate(id, { theme }, { new: true });

  res.json(newUser);
});

export const updateUser = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { name, email, password } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    throw HttpError(404, "No user with such ID");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      password,
    },
    { new: true }
  );

  res.json(updatedUser);
});
