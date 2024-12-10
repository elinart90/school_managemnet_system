const bcrypt = require('bcryptjs')

const hashPassword = async(password) => {
    try {
        //* Genrate a salt with 12 rounds
        const salt = await bcrypt.genSalt(12);
        
        //* Hahs the password useing the salt
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
        
    } catch (error) {
        throw new Error("Error hashing password: "+ error.message)
    }
}

module.exports = hashPassword