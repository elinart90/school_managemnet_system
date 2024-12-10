const express = require('express')
const router = express.Router()

const { signupValidation, signinValidation } = require('../validator/adminValidator')
const adminController = require('../controller/adminController')
const validate = require('../validator/validate')


router.post("/signup",signupValidation, validate, adminController.signUp )

router.post("/signin", signinValidation, validate, adminController.signIn)


module.exports = router