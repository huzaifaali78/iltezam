const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");





router.get("/", profileController.getProfiles);

router.put("/:id", profileController.updateProfile);


module.exports = router;

