import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  assistantName: {
    type: String,
    default: null,
  },
  assistantImage: {
    type: String,
    default: null,
  },
  history: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
