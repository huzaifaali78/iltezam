const Course = require("../models/coursemodel");


const createCourse = async (req, res) => {
  try {
    const {
      thumbnail,
      courseName,
      language,
      whatLearn,
      topics,
      status,
      tags,
    } = req.body;

    const newCourse = new Course({
      thumbnail,
      courseName,
      language,
      whatLearn,
      topics,
      status,
      tags,
    });

    const savedCourse = await newCourse.save();

    return res.status(201).json({
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Course updated successfully", data: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Course.findByIdAndDelete(id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const getAllQuizzesAgainstCourse = async (req, res) => {
  try {
    const { id } = req.params; 

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }


    let quizzes = [];
    course.topics.forEach(topic => {
      topic.chapters.forEach(chapter => {
        quizzes = quizzes.concat(chapter.quiz);
      });
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course" });
    }

    res.status(200).json({
      message: "Quizzes fetched successfully",
      data: quizzes,
    });

  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Quiz updated successfully", data: updatedQuiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    await Quiz.findByIdAndDelete(id);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
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
 
  updateQuiz,
  deleteQuiz,
};