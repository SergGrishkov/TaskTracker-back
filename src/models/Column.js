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
      unique: true,
      enum: ["To Do", "In progress", "Done"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Column", columnSchema);
