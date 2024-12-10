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
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Link parent to a student
      },
    },
    { timestamps: true }
  );
  
  const Parent = mongoose.model("Parent", parentSchema);
  module.exports = Parent;
  