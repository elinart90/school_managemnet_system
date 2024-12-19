const express = require('express')
const router = express.Router()

const studentController = require('../controller/studentController')
const { studentValidation } = require('../validator/studentValidator')
const validate = require('../validator/validate')

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new student
 *     description: Add a new student to the database.
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
 */


router.post("/", studentValidation, validate, studentController.createStudent ,
)

router.get("/", studentController.getAllStudent,
)

router.get("/:id", studentController.getAstudent)

router.put("/:id", studentController.updateStudent)

router.delete("/:id", studentController.deleteStudent)


module.exports = router  