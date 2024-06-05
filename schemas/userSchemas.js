import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

export const registerUserSchema = Joi.object({
  username: Joi.string().min(1).trim().lowercase().required(),
  password: Joi.string().min(6).trim().lowercase().required(),
  email: Joi.string().email().trim().lowercase().required(),
});

export default mongoose.model("User", userSchema);
