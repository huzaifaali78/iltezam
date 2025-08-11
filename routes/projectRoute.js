const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
upsertDashboard,
getDashboard,
deleteDashboard


  


} = require("../controllers/projectcontroller");


router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);


// router.post("/:id/contributions", addContribution); 
// router.post("/:id/courses", addCourse);
// router.post("/:id/move-to-in-progress", moveToInProgress);
// router.post("/:id/move-to-completed", moveToCompleted);
// router.post("/:id/save-course", saveCourse);  
// router.post("/:id/upload-certificate", uploadCertificate);
// router.get("/:id/certificates", getUserCertificates); 
// router.post("/account", upsertAccount);
// router.get("/account/:userId", getAccount);
// router.delete("/account/:userId", deleteAccount);
// router.post("/setting", upsertSetting);
// router.get("/setting/:userId", getSetting);
// router.delete("/setting/:userId", deleteSetting);
// // r
// router.post("/:id/contributions", addContribution);
// router.post("/:id/courses", addCourse);       
// router.post("/:id/move-to-in-progress", moveToInProgress);
// router.post("/:id/move-to-completed", moveToCompleted);
// router.post("/:id/save-course", saveCourse);
// router.post("/:id/upload-certificate", uploadCertificate);
// router.get("/:id/certificates", getUserCertificates);
// router.post("/account", upsertAccount);
// router.get("/account/:userId", getAccount);
// router.delete("/account/:userId", deleteAccount);
// router.post("/setting", upsertSetting);
// router.get("/setting/:userId", getSetting);
// router.delete("/setting/:userId", deleteSetting);
router.post("/dashboard", upsertDashboard);
router.get("/dashboard/:userId", getDashboard);
router.delete("/dashboard/:userId", deleteDashboard);
  

module.exports = router;