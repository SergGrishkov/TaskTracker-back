import mongoose from "mongoose";

const columnSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This field should be filled!"],
      unique: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Column", columnSchema);
