const mongoose = require("mongoose");

//* define stduent schema
const studentSchema = mongoose.Schema({
  name: {
    type: String,
      required: true,
      trim: true
    },
    studentCode: {
      type: String,
      unique: true,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    placeOfBirth: {
      type: String,
    },
    nationality: {
      type: String,
    },
    residentialAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true
    },
    parent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    }],
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
      }
    },
    previousSchool: {
      type: String,
      required: true,
    },
    lastGradeCompleted: {
      type: String,
      required: true
    },
    healthConditions: {
      type: String
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    assignedClasses: {
      type: String,
      enum: [
        "class 1",
        "class 2",
        "class 3",
        "class 4",
        "class 5",
        "class 6",
        "JHS 1",
        "JHS 2",
        "JHS 3",
      ],
      required: true,
    },
    level: {
      type: String,
      enum: ["Primary", "JHS"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Acitve"
    }
}, { timestamps: true } )

const Student = mongoose.model("Student", studentSchema)

module.exports = Student