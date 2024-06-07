import mongoose from "mongoose";

const dropdownSchema = mongoose.Schema({
  title: {
    type: String,
    ref: "title",
    required: true,
    enum: ["To Do", "In progress", "Done"],
  },
});

export default mongoose.model("Dropdown", dropdownSchema);
