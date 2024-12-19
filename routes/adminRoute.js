const express = require('express')
const router = express.Router()

const { signupValidation, signinValidation } = require('../validator/adminValidator')
const adminController = require('../controller/adminController')
const validate = require('../validator/validate')


/**
 * @swagger
 * /api/v1/admin:
 *   post:
 *     summary: Create a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The admin's name
 *               email:
 *                 type: string
 *                 description: The admin's email address
 *               password:
 *                 type: string
 *                 description: The admin's password
 *     responses:
 *       201:
 *         description: Successfully created the admin
 *       400:
 *         description: Bad request, invalid input
 */


router.post("/signup", (req, res) => {
    res.json({ message: "List of admins"})
},signupValidation, validate, adminController.signUp )

router.post("/signin", signinValidation, validate, adminController.signIn)


module.exports = router