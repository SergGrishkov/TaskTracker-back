import { Schema, mongoose } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    label: {
      type: String,
      required: [true, "Label is required"],
      enum: ["without priority", "low", "medium", "high"],
    },
    deadline: {
      type: String,
      required: [true, "Deadline is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Task", taskSchema);
