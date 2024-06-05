import { errorWrapper } from "../helpers/Wrappre.js";
import path from "path";
import User from "../db/models/User.js";
import Jimp from "jimp";


export const updateAvatar = errorWrapper(async (req, res, next) => {
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

async function deleteAvatar(oldAvatarURL) {
  if (oldAvatarURL && !oldAvatarURL.includes("gravatar")) {
    const oldAvatarFullName = path.resolve("public", oldAvatarURL);

    try {
      await fs.access(oldAvatarFullName);
      await fs.unlink(oldAvatarFullName);
    } catch (error) {}
  }
}

async function resizeImage(imagePath, width, height) {
  const image = await Jimp.read(imagePath);
  await image.resize(width, height);
  await image.writeAsync(imagePath);
}
