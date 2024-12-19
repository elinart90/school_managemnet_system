// const Student = require("../models/student"); // Import the Student model

// const generateUniqueCode = async () => {
//   let codeExists = true; 
//   let code;

//   while (codeExists) {
//     // Generate a 6-digit random number
//     const randomDigits = Math.floor(100000 + Math.random() * 900000); 
//     code = `STU${randomDigits}`;

//     // Check if the generated code already exists
//     const existingStudent = await Student.findOne({ studentCode: code });
//     if (!existingStudent) {
//       codeExists = false; // If no conflict, break the loop
//     }
//   }

//   return code;
// };

// module.exports = generateUniqueCode;



// const generateCode = (codeLength) => {
//   let code = "";
  
//   if (!codeLength) {
//     codeLength = 6; // Default to 6 digits if no length provided
//   }

//   // Use a secure random number generator (Math.random is not cryptographically secure)
//   const randomValue = Math.random().toString(36).substr(2, codeLength); // Generates alphanumeric characters
  
//   code = randomValue.toUpperCase(); // Make sure the code is uppercase, if needed
  
//   return code;
// };

// module.exports = generateCode;



const generateCode = (codeLength) => {
  const number = String(Math.random()).split(".")[1].split("");
  const length = number.length;
  let code = ""

  if(!codeLength){
      codeLength = 6
  }

  for (let i = 0; i < codeLength; i++) {
      code = code + number[length - (i+1)]
  }
  return code;
}


module.exports = generateCode  
