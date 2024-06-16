import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      default: null,
    },
    background: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.index({ userId: 1, title: 1 }, { unique: true });

export default mongoose.model("Board", boardSchema);
