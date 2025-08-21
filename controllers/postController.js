const Post = require("../models/postModel");
const Comment = require("../models/commentModel"); // assuming you have Comment model
const Profile = require("../models/profileModel");


const createPost = async (req, res) => {
  try {
    const { content, imageUrl, videoUrl } = req.body;
    const userId = req.user.id;

    const post = await Post.create({
      content,
      imageUrl,
      videoUrl,
      user: userId,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT POST
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Post updated successfully", post: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user");
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully", deletedPost: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE POST
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id).populate("likedUsers");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likedUsers.some((u) => u._id.toString() === userId);

    if (alreadyLiked) {
      post.likedUsers = post.likedUsers.filter((u) => u._id.toString() !== userId);
    } else {
      post.likedUsers.push(userId);
    }

    post.likes = post.likedUsers.length;
    await post.save();

    res.json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SHARE POST
const sharePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id).populate("sharedUsers");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyShared = post.sharedUsers.some((u) => u._id.toString() === userId);

    if (!alreadyShared) {
      post.sharedUsers.push(userId);
      post.shares += 1;
      await post.save();
    }

    res.json({ message: "Post shared successfully", shares: post.shares });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user profile comments likedUsers sharedUsers originalPost")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET POST BY ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user profile comments likedUsers sharedUsers originalPost");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE COMMENT
const createComment = async (req, res) => {
  try {
    const { content, post_id } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(post_id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({ content, post: post_id, user: userId });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: "Comment created", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id).populate("post user");
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const isPostOwner = comment.post.user.toString() === userId;
    const isCommentOwner = comment.user._id.toString() === userId;

    if (!isPostOwner && !isCommentOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(id);

    await Post.findByIdAndUpdate(comment.post._id, {
      $pull: { comments: comment._id },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS BY POST
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate("user");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTopLikedPosts = async (req, res) => {
  try {
    const topLikedPosts = await Post.aggregate([
      {
        $project: {
          content: 1,
          user: 1,
          likes: 1,
          commentsCount: { $size: "$comments" },
          createdAt: 1,
        },
      },
      { $sort: { likes: -1 } },
      { $limit: 5 },
    ]);
    res.json(topLikedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTopCommentedPosts = async (req, res) => {
  try {
    const topCommentedPosts = await Post.aggregate([
      {
        $project: {
          content: 1,
          user: 1,
          likes: 1,
          commentsCount: { $size: "$comments" },
          createdAt: 1,
        },
      },
      { $sort: { commentsCount: -1 } },
      { $limit: 5 },
    ]);
    res.json(topCommentedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  likePost,
  sharePost,
  getAllPosts,
  getPostById,
  createComment,
  deleteComment,
  getCommentsByPost,
  getTopLikedPosts,
  getTopCommentedPosts,
};
