import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      enum: [
        "icon/project",
        "star",
        "loading",
        "container",
        "lightning",
        "colors",
        "hexagon",
      ],
      default: "icon/project",
    },
    background: {
      type: String,
      enum: [
        "magnolia",
        "night",
        "sakura",
        "moon",
        "lists",
        "sky",
        "rocks",
        "drib",
        "moon2",
        "boat",
        "balloon",
        "rocks2",
        "sea",
        "balloons",
        "nightsky",
      ],
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Board", boardSchema);
