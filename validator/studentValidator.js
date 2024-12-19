const { check } = require("express-validator");

const studentValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  check("assignedClasses")
    .notEmpty()
    .withMessage("Assigned classes is required")
    .isString()
    .withMessage("Assigned classes must be a string")
    .isIn([
      "class 1",
      "class 2",
      "class 3",
      "class 4",
      "class 5",
      "class 6",
      "JHS 1",
      "JHS 2",
      "JHS 3",
    ])
    .withMessage(
      "Invalid assignedClasses. Allowed values are 'class 1' to 'class 6' or 'JHS 1' to 'JHS 3'"
    ),

  check("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be in the format YYYY-MM-DD"),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Invalid gender. Allowed values are 'Male' and 'Female'"),

  check("residentialAddress")
    .notEmpty()
    .withMessage("Residential address is required")
    .isString()
    .withMessage("Residential address must be a string"),

  check("level")
    .notEmpty()
    .withMessage("Level is required")
    .isIn(["Primary", "JHS"])
    .withMessage("Invalid level. Allowed values are 'Primary' and 'JHS'"),
];

module.exports = {
  studentValidation,
};
