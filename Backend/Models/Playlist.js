const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema(
  {
    Songs: [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
