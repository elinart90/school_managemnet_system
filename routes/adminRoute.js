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


/**
 * @swagger
 * /api/v1/admin/signin:
 *   post:
 *     summary: Admin sign in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The admin's email address
 *               password:
 *                 type: string
 *                 description: The admin's password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       401:
 *         description: Unauthorized, invalid credentials
 */
 
// Route for an admin to sign in
// This route will receive the admin's email and password,
// validate the credentials, and then call the signIn method from the adminController.
// If successful, a session or JWT will be generated for the admin.
// If invalid, it will return an error message indicating incorrect credentials.
router.post("/signin", signinValidation, validate, adminController.signIn)


module.exports = router