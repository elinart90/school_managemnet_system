const Teacher = require("../models/teacher");
const Subject = require("../models/subject");

//* Add a new teacher
const addTeacher = async (req, res, next) => {
  try {
    const { name, email, assignedClasses, assignedSubjects } = req.body;

    //* Check for duplicate email
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Teacher with this email already exists",
      });
    }

    //* Validate assignedSubjects
    if (assignedSubjects) {
      const validSubjects = await Subject.find({
        _id: { $in: assignedSubjects },
      });
      if (validSubjects.length !== assignedSubjects.length) {
        return res.status(400).json({
          code: 400,
          status: false,
          message: "Some subject IDs are invalid",
        });
      }
    }

    //* Create teacher
    const teacher = new Teacher({
      name,
      email,
      assignedClasses,
      assignedSubjects,
    });
    await teacher.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "Teacher added successfully",
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTeacher = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate(
      "assignedSubjects",
      "name level"
    );
    res.status(200).json({
      code: 200,
      status: true,
      message: "Teachers fetched successfully",
      teachers,
    });
  } catch (error) {
    next(error);
  }
};

const getATeacher = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id).populate(
      "assignedSubjects",
      "name level"
    );
    if (!teacher) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, assignedSubjects, assignedClasses } = req.body;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Teacher not found",
      });
    }

    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (assignedClasses) teacher.assignedClasses = assignedClasses;
    if (assignedSubjects) teacher.assignedSubjects = assignedSubjects;

    await teacher.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Teacher not found",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTeacher,
  getAllTeacher,
  getATeacher,
  updateTeacher,
  deleteTeacher,
};
