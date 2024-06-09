import mongoose from "mongoose";

const columnSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    title: {
      type: String,
      required: [true, "This field should be filled!"],
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.index({ userId: 1, boardId: 1, title: 1 }, { unique: true });

export default mongoose.model("Column", columnSchema);
