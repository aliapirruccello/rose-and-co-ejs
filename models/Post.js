const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  formula: {
    type: String,
    required: false,
  },
  haircutNotes: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  sparkNotes: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
