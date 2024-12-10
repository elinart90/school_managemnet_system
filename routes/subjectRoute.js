const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subjectController");

router.post("/", subjectController.addSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);
router.put("/:id", subjectController.updateSubject);
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
