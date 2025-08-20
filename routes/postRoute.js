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
} = require("../controllers/postController");
const tokenAuth = require("../middleware/authmiddleware");

const router = express.Router();



router.post("/createPost", tokenAuth, createPost);               // Create Post
router.put("/:id", editPost);               // Edit Post
router.delete("/:id", deletePost);          // Delete Post
router.post("/:id/like", likePost);     
router.post("/:id/share", sharePost);       // Share Post
router.get("/", getAllPosts);               
router.get("/:id", getPostById);     
router.post("/", createComment);
router.delete("/:id", deleteComment);            
router.get("/post/:postId", getCommentsByPost);  


module.exports = router;
