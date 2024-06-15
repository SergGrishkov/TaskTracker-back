import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        transformation: { width: 68, height: 68, crop: "fill" },
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// const tempDir = path.resolve("tmp");
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },

//   filename: (req, file, cb) => {
//     const extName = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, extName);
//     const suffix = crypto.randomUUID();
//     cb(null, `${baseName}-${suffix}${extName}`);
//   },

//   limits: { filesize: 4096 },
// });

// const upload = multer({ storage: multerConfig });
// export default upload;
