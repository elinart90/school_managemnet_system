const Student = require("../models/student")
const generateCode = require("../utilities/studentCode")

const createStudent = async (req, res, next) => {
  try {
    const {
      name, dateOfBirth, gender, placeOfBirth, nationality,
      residentialAddress, phoneNumber, parent, emergencyContact,
      previousSchool, lastGradeCompleted, healthConditions, 
      assignedClasses, level, status
    } = req.body;

    //* Generate Code
    const studCode = generateCode(6);  //* This generates a unique 6-digit code

    const newStudent = new Student({
      name, 
      studentCode: `STU${studCode}`,  //* Use the generated studCode here
      dateOfBirth, 
      gender, 
      placeOfBirth, 
      nationality,
      residentialAddress, 
      phoneNumber, 
      parent, 
      emergencyContact, 
      previousSchool,
      lastGradeCompleted, 
      healthConditions, 
      assignedClasses, 
      level, 
      status
    });

    //* Save student to the database
    await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent
    });
    
  } catch (error) {
    next(error);
  }
}


const getAllStudent = async (req, res, next) => {
  try {
    const students = await Student.find();  

    if (students.length === 0) {  
      return res.status(404).json({  
        message: "No students found"
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Students fetched successfully",
      students  // Return students (plural)
    });
    
  } catch (error) {
    next(error);
  }
};



const getAstudent = async(req, res, next) => {
  try {
    const { id } = req.params

    const student = await Student.findById(id)

    if(!student) {
      return res.status(401).json({
        message: "Student not found"
      })
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Student fetech successfully",
      student
    })
    
  } catch (error) {
    next
  }
}

const updateStudent = async(req, res, next) => {
  try {
    const { id } = req.params
    const {
      name, dateOfBirth, gender, placeOfBirth, nationality,
      residentialAddress, phoneNumber, parent, emergencyContact,
      previousSchool, lastGradeCompleted, healthConditions, 
      assignedClasses, level, status
    } = req.body

    const student = await Student.findById(id)
    if(!student) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Student not found"
      })
    }

    if(name) student.name = name
    if(dateOfBirth) student.dateOfBirth = dateOfBirth
    if(gender) student.gender = gender
    if(placeOfBirth) student.placeOfBirth = placeOfBirth
    if(nationality) student.nationality = nationality
    if(residentialAddress) student.residentialAddress = residentialAddress
    if(phoneNumber) student.phoneNumber = phoneNumber
    if(parent) student.parent = parent
    if(emergencyContact) student.emergencyContact = emergencyContact
    if(previousSchool) student.previousSchool = previousSchool
    if(lastGradeCompleted) student.lastGradeCompleted = lastGradeCompleted
    if(healthConditions) student.healthConditions = healthConditions
    if(assignedClasses) student.assignedClasses = assignedClasses
    if(level) student.level = level
    if(status) student.status = status

    //* save newUpdate
    await student.save()
    res.status(200).json({
      message: "Student updated successfully",
      student
    })
    
  } catch (error) {
    next(error)
  }
}


const deleteStudent = async(req, res, next) => {
  try {
    const { id } = req.params

    const student = await Student.findByIdAndDelete(id)
    if(!student) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Student not found"
      })
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Student deleted successfully"
    })
    
  } catch (error) {
    next(error)
  }
}


module.exports = {
  createStudent,
  getAllStudent,
  getAstudent,
  updateStudent,
  deleteStudent  
}