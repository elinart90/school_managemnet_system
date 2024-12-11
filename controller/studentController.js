const Student = require('../models/student')
const File = require('../models/File');
const Parent = require('../models/Parent');
const Teacher = require('../models/teacher');
const generateStudentCode = require('../utils/studentCodeGenerator');


const createStudent = async(req, res, next) => {
    try {
        const { name, studentCode, profilePic, parent, class: studentClass, classTeacher, subjects, level, status } = req.body

        //* validate ref
        if(profilePic) {
            await File.findById(profilePic)
        }

        if(parent && parent.length) {
            await Promise.all(parent.map(p => Parent.findById(p)))
        }

        await Teacher.findById(classTeacher)

        //* Create new Student
        const newStudent = new Student({
            name, studentClass, profilePic,
            class: studentClass, classTeacher,
            subjects, level, status
        })
        await newStudent.save()

        res.status(201).json({
            message: "Student created successfully",
            student: newStudent
        })
        
    } catch (error) {
        next(error)
    }
}

const getAllStudent = async(req, res, next) => {
    try {
        const { page = 1, limit = 10, class: studentClass, level, status, sortBy = "CreatedAt", sortOrder = "desc"} = req.query

        //* Build filter object
      const filter = {};
      if (studentClass) filter.class = studentClass;
      if (level) filter.level = level;
      if (status) filter.status = status;

      //* Populate references
      const students = await Student.find(filter)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .limit(Number(limit))
        .skip((page - 1) * limit)
        .populate('profilePic')
        .populate('parent')
        .populate('classTeacher')
        .populate('subjects');

        //* GET TOTAL count for pagination
        const total = await Student.countDocuments(filter)

        res.status(200).json({
            students, 
            totalPages: Math.ceil(total /limit),
            currentPage: Number(page),
            totalStudents: total
        })

        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createStudent,
}