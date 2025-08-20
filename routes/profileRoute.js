const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");





router.get("/", profileController.getProfiles);

router.put("/:id", profileController.updateProfile);
router.post("/follow", profileController.followUser);
router.post("/unfollow", profileController.unfollowUser);
router.post("/accept", profileController.acceptFollow);


module.exports = router;

