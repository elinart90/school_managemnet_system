const { check } = require("express-validator");

const parentValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required"),

  check("teleNumber")
    .notEmpty()
    .withMessage("Telephone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number format"),

  check("relationship") // Corrected field name
    .notEmpty()
    .withMessage("Provide the relationship between the student and you"),

  check("location")
    .notEmpty()
    .withMessage("Location is required"),

  // check("student")
  //   .notEmpty()
  //   .withMessage("Student reference is required"),
];

module.exports = parentValidation;
