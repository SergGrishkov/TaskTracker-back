import { Schema, mongoose } from "mongoose";

const backgroundSchema = new Schema({
  id: {
    type: String,
  },
  String,
});

export default mongoose.model("Background", backgroundSchema);
