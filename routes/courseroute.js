const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllQuizzesAgainstCourse,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/coursecontroller");

router.post("/createCourse", createCourse);
router.get("/allCourses", getAllCourses);
router.get("/getCourseByid/:id", getCourseById);
router.put("/updateCourse", updateCourse);
router.delete("/deleteCourse", deleteCourse);

router.get("/getAllQuizzes/:id", getAllQuizzesAgainstCourse);

router.put("updateQuiz", updateQuiz);
router.delete("deleteQuiz", deleteQuiz);

module.exports = router;
