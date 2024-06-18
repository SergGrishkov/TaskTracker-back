import { Schema, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    isGoogleAuth: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    theme: {
      type: String,
      enum: ["Light", "Dark", "Violet"],
      default: "Light",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
