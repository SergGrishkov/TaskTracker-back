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
      default: null,
    },
    // background: {
    //   type: String,
    //   enum: [
    //     "balloon",
    //     "balloons-in-rocks",
    //     "balls",
    //     "bamboo",
    //     "boat",
    //     "bus-in-rocks",
    //     "clouds",
    //     "full-moon",
    //     "new-moon",
    //     "night-in-mountains",
    //     "pink-flowers",
    //     "pink-tree",
    //     "rocks-in-sea",
    //     "sky-rocks",
    //     "yacht",
    //   ],
    //   default: null,
    // },
    background: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    backgroundId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Board", boardSchema);
