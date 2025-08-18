const Course = require("../models/coursemodel");

// Create Course
const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json({ message: "Course created successfully", data: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Courses fetched successfully", data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course fetched successfully", data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated successfully", data: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Quizzes in a Course
const getAllQuizzesAgainstCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let quizzes = [];
    course.topics.forEach(topic => {
      topic.chapters.forEach(chapter => {
        quizzes = quizzes.concat(chapter.quiz);
      });
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course" });
    }

    res.status(200).json({ message: "Quizzes fetched successfully", data: quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Quiz inside Course
const updateQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const {  title, description, options, correctOption } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const topic = course.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    const chapter = topic.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const quiz = chapter.quiz.id(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (options) quiz.options = options;
    if (correctOption) quiz.correctOption = correctOption;

    await course.save();
    res.json({ message: "Quiz updated successfully", data: quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllQuizzesAgainstCourse,
  updateQuiz
};