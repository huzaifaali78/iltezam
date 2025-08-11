const Project = require("../models/project");


// Create Project
const createProject = async (req, res) => {
  try {
    const {
      projectImage,
      thumnailImage,
      projectName,
      fundraisingGoal,
      location,
      startDate,
      finishDate,
      about,
      projectCategory,
      position,
    } = req.body;

    const newProject = new Project({
      projectImage,
      thumnailImage,
      projectName,
      fundraisingGoal,
      location,
      startDate,
      finishDate,
      about,
      projectCategory,
      position,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Project By ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!["donation", "volunteer"].includes(project.projectCategory)) {
      return res.status(400).json({ message: "Only donation or volunteer projects can be updated" });
    }
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!["donation", "volunteer"].includes(project.projectCategory)) {
      return res.status(400).json({ message: "Only donation or volunteer projects can be deleted" });
    }
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create or update dashboard
const upsertDashboard = async (req, res) => {
  try {
    const { userId, contribution, courses, certification, myAccount, setting } = req.body;
    let dashboard = await Dashboard.findOne({ userId });
    if (dashboard) {
      // Update existing dashboard
      dashboard.contribution = contribution || dashboard.contribution;
      dashboard.courses = courses || dashboard.courses;
      dashboard.certification = certification || dashboard.certification;
      dashboard.myAccount = myAccount || dashboard.myAccount;
      dashboard.setting = setting || dashboard.setting;
    } else {
      // Create new dashboard
      dashboard = new Dashboard({
        userId,
        contribution,
        courses,
        certification,
        myAccount,
        setting,
      });
    }
    await dashboard.save();
    res.status(200).json({ message: "Dashboard saved successfully", data: dashboard });
  } catch (error) {
    res.status(500).json({ message: "Error saving dashboard", error: error.message });
  }
};

// Get dashboard by userId
const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) return res.status(404).json({ message: "Dashboard not found" });
    res.json({ data: dashboard });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};

// Delete dashboard
const deleteDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    const dashboard = await Dashboard.findOneAndDelete({ userId });
    if (!dashboard) return res.status(404).json({ message: "Dashboard not found" });
    res.json({ message: "Dashboard deleted", data: dashboard });
  } catch (error) {
    res.status(500).json({ message: "Error deleting dashboard", error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  upsertDashboard,
  getDashboard,
  deleteDashboard,
};