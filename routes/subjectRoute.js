const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subjectController");


/**
 * @swagger
 * /api/v1/subject:
 *   get:
 *     summary: Retrieve all subject data
 *     responses:
 *       200:
 *         description: Successfully retrieved subject data
*/


router.post("/", subjectController.addSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);
router.put("/:id", subjectController.updateSubject);
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
