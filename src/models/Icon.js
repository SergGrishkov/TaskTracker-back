import mongoose from "mongoose";

const iconSchema = mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Icon", iconSchema);
