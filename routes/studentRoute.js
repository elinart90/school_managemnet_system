const express = require('express')
const router = express.Router()

const studentController = require('../controller/studentController')
const { studentValidation } = require('../validator/studentValidator')
const validate = require('../validator/validate')

router.post("/student",studentValidation, validate, studentController.student )



module.exports = router