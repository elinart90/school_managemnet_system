const mongoose = require("mongoose")

const parentSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      teleNumber: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Parent = mongoose.model("Parent", parentSchema);
  module.exports = Parent;
  