const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subjectController");

/**
 * @swagger
 * /api/v1/subject:
 *   post:
 *     summary: Add a new subject
 *     description: Create a new subject in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subject
 *               code:
 *                 type: string
 *                 description: The code for the subject
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subject created successfully
 *       400:
 *         description: Bad request, invalid input
 */

/**
 * @swagger
 * /api/v1/subject:
 *   get:
 *     summary: Retrieve all subjects
 *     description: Fetch a list of all subjects from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved subject data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The subject ID
 *                   name:
 *                     type: string
 *                     description: The subject's name
 *                   code:
 *                     type: string
 *                     description: The subject's code
 */

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   get:
 *     summary: Retrieve a specific subject by ID
 *     description: Fetch the details of a subject based on the subject ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subject to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the subject data
 *       404:
 *         description: Subject not found
 */

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   put:
 *     summary: Update a subject by ID
 *     description: Update the details of an existing subject using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subject to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the subject
 *               code:
 *                 type: string
 *                 description: The updated code of the subject
 *     responses:
 *       200:
 *         description: Successfully updated the subject data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Subject not found
 */

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     description: Delete a subject from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subject to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the subject
 *       404:
 *         description: Subject not found
 */

router.post("/", subjectController.addSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);
router.put("/:id", subjectController.updateSubject);
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
