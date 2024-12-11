const mongoose = require("mongoose");

// Define Student Schema
const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentCode: {
      type: String,
      unique: true,
      unique: true,
      required: true // Ensures unique student codes
    },
    profilePic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File", // File reference for profile pictures
    },
    parent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent", // Reference to Parent schema
      },
    ],
    class: {
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
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to Teacher schema
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // Reference to Subject schema
      },
    ],
    level: {
      type: String,
      enum: ["Primary", "Junior High"], // Indicates the level of education
      required: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Active"
    }

  },
  { timestamps: true }
);

// Add a pre-save hook to ensure studentCode is generated if not provided
studentSchema.pre('save', async function(next) {
  if (!this.studentCode) {
    // Import the code generation logic
    const generateStudentCode = require('../utilities/studentCode');
    this.studentCode = await generateStudentCode(this.class);
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
