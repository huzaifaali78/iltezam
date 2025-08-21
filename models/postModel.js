const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    imageUrl: [String],
    videoUrl: [String],
    visibility: { type: String, enum: ["public", "private"], default: "public" },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    PostImage: String,
    isRepost: { type: Boolean, default: false },

    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },

    comments: [
      {
        content: { type: String, required: true },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
      { timestamps: true },
    ],

    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sharedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    originalPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
