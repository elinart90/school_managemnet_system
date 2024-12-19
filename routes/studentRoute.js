const express = require('express')
const router = express.Router()

const studentController = require('../controller/studentController')
const { studentValidation } = require('../validator/studentValidator')
const validate = require('../validator/validate')

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     summary: Create a new student
 *     description: Add a new student to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The student's name
 *               email:
 *                 type: string
 *                 description: The student's email address
 *               phone:
 *                 type: string
 *                 description: The student's phone number
 *               grade:
 *                 type: string
 *                 description: The student's grade or class
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created successfully
 *                 student:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: John Doe
 *       400:
 *         description: Bad request, invalid input
 */
 
// Route to create a new student
// This route accepts the student's name, email, phone, and grade in the request body and 
// creates a new student in the database.
router.post("/", studentValidation, validate, studentController.createStudent)

/**
 * @swagger
 * /api/v1/student:
 *   get:
 *     summary: Retrieve all students
 *     description: Fetch a list of all students in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The student's ID
 *                   name:
 *                     type: string
 *                     description: The student's name
 *                   grade:
 *                     type: string
 *                     description: The student's grade or class
 */
 
// Route to get all students
// This route retrieves a list of all students from the database.
router.get("/", studentController.getAllStudent)

/**
 * @swagger
 * /api/v1/student/{id}:
 *   get:
 *     summary: Retrieve a specific student by ID
 *     description: Fetch the data of a specific student based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved student data
 *       404:
 *         description: Student not found
 */
 
// Route to get a specific student by ID
// This route retrieves the student data for a specific student based on their ID.
router.get("/:id", studentController.getAstudent)

/**
 * @swagger
 * /api/v1/student/{id}:
 *   put:
 *     summary: Update student data by ID
 *     description: Update the details of a specific student based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to update
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
 *                 description: The student's name
 *               email:
 *                 type: string
 *                 description: The student's email address
 *               phone:
 *                 type: string
 *                 description: The student's phone number
 *               grade:
 *                 type: string
 *                 description: The student's grade or class
 *     responses:
 *       200:
 *         description: Successfully updated student data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Student not found
 */
 
// Route to update student data by ID
// This route allows updating an existing student's data using their ID in the URL.
// It accepts the student's name, email, phone, and grade in the request body.
router.put("/:id", studentController.updateStudent)

/**
 * @swagger
 * /api/v1/student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Delete a student from the database using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the student
 *       404:
 *         description: Student not found
 */
 
// Route to delete a student by ID
// This route deletes a student from the database using their ID.
router.delete("/:id", studentController.deleteStudent)

module.exports = router
