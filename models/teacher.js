const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      assignedClasses: [
        {
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
        },
      ],
      assignedSubjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject", // Link teacher to subjects
        },
      ],
    },
    { timestamps: true }
  );
  
  const Teacher = mongoose.model("Teacher", teacherSchema);
  module.exports = Teacher;
  