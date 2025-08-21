const express = require("express");
const {
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
} = require("../controllers/postController");
const tokenAuth = require("../middleware/authmiddleware");

const router = express.Router();

// Post CRUD
router.post("/createPost", tokenAuth, createPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

// Like & Share
router.post("/:id/like", likePost);
router.post("/:id/share", sharePost);

// Get Posts
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Comments
router.post("/", createComment);
router.delete("/:id", deleteComment);
router.get("/post/:postId", getCommentsByPost);

// Aggregation Routes
router.get("/top-liked", getTopLikedPosts);
router.get("/top-commented", getTopCommentedPosts);

module.exports = router;

