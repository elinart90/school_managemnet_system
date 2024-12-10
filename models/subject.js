const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      level: {
        type: String,
        enum: ["Primary", "Junior High"], // Subject levels
      },
    },
    { timestamps: true }
  );
  
  const Subject = mongoose.model("Subject", subjectSchema);
  module.exports = Subject;
  