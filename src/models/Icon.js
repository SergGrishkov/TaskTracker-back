import mongoose from "mongoose";

const iconSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  path: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/).*$/i.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid path! Please provide a valid URL path.`,
    },
  },
});

export default mongoose.model("Icon", iconSchema);
