const check = require('express-validator')


const studentValidation = [
    check("name")
    .notEmpty().withMessage("Name is required"),

    check('level')
    .notEmpty().withMessage("Level must be knwon")
]

module.exports = {
    studentValidation
}