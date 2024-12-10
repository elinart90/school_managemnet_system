const Parent = require('../models/parent');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const student = async(req, res, next) => {
    try {
        const { name, studentCode, profilePic, parentInfo, class: className, level} = req.body

        //* Create parent records
        const parentIds = [];
        for(const parent of parentInfo) {
            const newParent = await Parent.create(parent)
            parentIds.push(newParent._id)
        }

        //*Assign class teacher dynamically
        const classTeacher = await Teacher.findOne({
            assignedClasses: className
        })

        //* create student
        const student = await Student.create({
            name, 
            studentCode,
            profilePic, 
            parent: parentIds,
            class: className,
            level,
            classTeacher: classTeacher._id,
        })

        res.status(201).json({
            code: 201,
            status: true,
            message: "Student added successfully",
            student
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    student
}