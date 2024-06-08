import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      enum: ["Light", "Dark", "Violet"],
      default: "Light",
    },
    background: {
      type: String,
      enum: ["Light", "Dark", "Violet"],
      default: "Light",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Board", boardSchema);
