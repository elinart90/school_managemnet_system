const express = require('express')
const router = express.Router()


const teacherController = require('../controller/teacherController')
const { createTeacher, validate} = require('../validator/teacherValidator')

router.post('/', createTeacher, validate, teacherController.addTeacher)

router.get('/', teacherController.getAllTeacher)

router.get("/:id", teacherController.getATeacher)

router.put("/:id", teacherController.updateTeacher)

router.delete('/:id', teacherController.deleteTeacher)



module.exports = router
    