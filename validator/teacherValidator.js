const { check, validationResult } = require("express-validator");

// List of valid classes
const validClasses = [
  "class 1",
  "class 2",
  "class 3",
  "class 4",
  "class 5",
  "class 6",
  "JHS 1",
  "JHS 2",
  "JHS 3",
];

// Validation middleware
const createTeacher = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("assignedClasses")
    .isArray({ min: 1 })
    .withMessage("Assigned classes must be an array and cannot be empty")
    .custom((assignedClasses) => {
      const invalidClasses = assignedClasses.filter(
        (cls) => !validClasses.includes(cls)
      );
      if (invalidClasses.length > 0) {
        throw new Error(
          `Invalid classes: ${invalidClasses.join(", ")}. Please provide valid class names.`
        );
      }
      return true;
    }),
  check("assignedSubjects")
    .isArray()
    .withMessage("Assigned subjects must be an array"),
];

// Error validation result middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 400,
      status: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  createTeacher,
  validate,
};
