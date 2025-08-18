const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllQuizzesAgainstCourse,
  updateQuiz
} = require("../controllers/coursecontroller");

router.post("/createCourse", createCourse);
router.get("/allCourses", getAllCourses);
router.get("/getCourseByid/:id", getCourseById);
router.put("/updateCourse/:id", updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.get("/getAllQuizzes/:id", getAllQuizzesAgainstCourse);
router.put("/updateQuiz/:id", updateQuiz);

module.exports = router;
