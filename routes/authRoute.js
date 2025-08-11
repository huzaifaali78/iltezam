const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

router.post("/register", userController.registerUser);



module.exports = router;
