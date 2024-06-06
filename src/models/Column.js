import mongoose from "mongoose";

const columnSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This field should be filled!"],
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Column", columnSchema);
