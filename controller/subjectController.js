const Subject = require("../models/subject");

// Add a new subject
const addSubject = async (req, res, next) => {
  try {
    const { name, level } = req.body;

    // Check for duplicate subject
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Subject with this name already exists",
      });
    }

    // Create a new subject
    const subject = new Subject({ name, level });
    await subject.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "Subject added successfully",
      subject,
    });
  } catch (error) {
    next(error);
  }
};

// Get all subjects
const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
};

// Get a single subject by ID
const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Subject not found",
      });
    }

    res.status(200).json(subject);
  } catch (error) {
    next(error);
  }
};

// Update a subject
const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Subject not found",
      });
    }

    if (name) subject.name = name;
    if (level) subject.level = level;

    await subject.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a subject
const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
