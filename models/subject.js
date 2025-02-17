const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["Primary", "JHS"], // Subject levels
      },
    },
    { timestamps: true }
  );
  
  const Subject = mongoose.model("Subject", subjectSchema);
  module.exports = Subject;
  