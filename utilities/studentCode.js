const Student = require('../models/student');

async function generateStudentCode(studentClass) {
  // Normalize class name to create a short code prefix
  const getClassPrefix = (cls) => {
    // Convert class to lowercase and remove spaces
    const normalizedClass = cls.toLowerCase().replace(/\s+/g, '');
    
    // Map classes to short codes
    const classPrefixes = {
      'class1': 'cl1',
      'class2': 'cl2',
      'class3': 'cl3',
      'class4': 'cl4',
      'class5': 'cl5',
      'class6': 'cl6',
      'jhs1': 'jhs1',
      'jhs2': 'jhs2',
      'jhs3': 'jhs3'
    };

    return classPrefixes[normalizedClass] || 'std';
  };

  // Get class prefix
  const prefix = getClassPrefix(studentClass);

  // Find the maximum existing student code for this class
  const lastStudent = await Student.findOne({
    class: studentClass
  }).sort({ studentCode: -1 }).limit(1);

  // Determine the next number
  let nextNumber = 1;
  if (lastStudent && lastStudent.studentCode) {
    // Extract the numeric part and increment
    const lastNumber = parseInt(lastStudent.studentCode.replace(prefix, ''), 4);
    nextNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
  }

  // Pad the number to 3 digits
  const paddedNumber = nextNumber.toString().padStart(3, '0');

  // Combine prefix and padded number
  return `${prefix}${paddedNumber}`;
}

module.exports = generateStudentCode;