const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacherController');
const { createTeacher, validate } = require('../validator/teacherValidator');

/**
 * @swagger
 * /api/v1/teacher:
 *   post:
 *     summary: Add a new teacher
 *     description: Create a new teacher record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the teacher
 *               subject:
 *                 type: string
 *                 description: The subject the teacher teaches
 *               class:
 *                 type: string
 *                 description: The class the teacher teaches
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teacher created successfully
 *       400:
 *         description: Bad request, invalid input
 */

/**
 * @swagger
 * /api/v1/teacher/byclass:
 *   get:
 *     summary: Retrieve teachers by class
 *     description: Get a list of teachers filtered by class.
 *     responses:
 *       200:
 *         description: Successfully retrieved teachers by class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The teacher ID
 *                   name:
 *                     type: string
 *                     description: The teacher's name
 *                   subject:
 *                     type: string
 *                     description: The subject the teacher teaches
 *                   class:
 *                     type: string
 *                     description: The class the teacher teaches
 */

/**
 * @swagger
 * /api/v1/teacher:
 *   get:
 *     summary: Retrieve all teacher data
 *     description: Get a list of all teachers in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all teacher data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The teacher ID
 *                   name:
 *                     type: string
 *                     description: The teacher's name
 *                   subject:
 *                     type: string
 *                     description: The subject the teacher teaches
 *                   class:
 *                     type: string
 *                     description: The class the teacher teaches
 */

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   get:
 *     summary: Retrieve a specific teacher by ID
 *     description: Get the details of a teacher using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the teacher's data
 *       404:
 *         description: Teacher not found
 */

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   put:
 *     summary: Update a teacher's data
 *     description: Update the details of an existing teacher using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to update
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
 *                 description: The updated name of the teacher
 *               subject:
 *                 type: string
 *                 description: The updated subject the teacher teaches
 *               class:
 *                 type: string
 *                 description: The updated class the teacher teaches
 *     responses:
 *       200:
 *         description: Successfully updated the teacher's data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Teacher not found
 */

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     description: Delete a teacher record from the database using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the teacher
 *       404:
 *         description: Teacher not found
 */

router.post('/', createTeacher, validate, teacherController.addTeacher);

router.get('/byclass', teacherController.getTeaacherByClass);

router.get('/', teacherController.getAllTeacher);

router.get("/:id", teacherController.getATeacher);

router.put("/:id", teacherController.updateTeacher);

router.delete('/:id', teacherController.deleteTeacher);    


module.exports = router;
