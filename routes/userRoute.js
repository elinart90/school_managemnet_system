const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { signinValidation, signupValidation, emailValidator, verifyUserValidator, recoverPasswordvalidation, changePasswordValidator } = require('../validator/userValidator');
const validate = require('../validator/validate');

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       201:
 *         description: Successfully created the user
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/signup', signupValidation, validate, userController.signupUser);

/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     summary: User sign-in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post('/signin', signinValidation, validate, userController.signInUser);


/**
 * @swagger
 * /api/v1/user/verificationcode:
 *   post:
 *     summary: Send a verification code to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *       400:
 *         description: Bad request, invalid email
 */

router.post("/verificationcode", emailValidator, validate, userController.sendVerificationCode)


/**
 * @swagger
 * /api/v1/user/verifyuser:
 *   post:
 *     summary: Verify a user with a verification code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               verificationCode:
 *                 type: string
 *                 description: The verification code sent to the user's email
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid verification code or email
 */

router.post('/verifyuser', verifyUserValidator, validate,
    userController.verifyUser
)


/**
 * @swagger
 * /api/v1/user/recoverpassword:
 *   post:
 *     summary: Recover a user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *     responses:
 *       200:
 *         description: Recovery email sent successfully
 *       400:
 *         description: Invalid email or request
 */

router.post("/recoverpassword", recoverPasswordvalidation, validate,
    userController.recoverPassword
)


/**
 * @swagger
 * /api/v1/user/forgotcode:
 *   post:
 *     summary: Request a forgot password code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *     responses:
 *       200:
 *         description: Forgot password code sent successfully
 *       400:
 *         description: Invalid email or request
 */


router.post('/forgotcode', emailValidator, validate, userController.forgotCode)


/**
 * @swagger
 * /api/v1/user/changepassword:
 *   put:
 *     summary: Change the user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               oldPassword:
 *                 type: string
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request or password mismatch
 */
router.put('/changepassword', changePasswordValidator, validate, userController.changedPassword)



module.exports = router;
