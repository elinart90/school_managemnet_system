const Admin = require('../models/admin')
const comparePassword = require('../utilities/comparePaddword')
const generateToken = require('../utilities/generateToken')
const hashPassword = require('../utilities/hashPassword')
//*const PasswordRegex = require('../middleware/passwordRegex')
const signUp = async(req, res, next) => {
    try {
        const { name, email, password } = req.body
    
        //* Check if email already exist
        const isEmailExist = await Admin.findOne({ email })
        if(isEmailExist) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }
    
        //*PasswordRegex(password);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                message: "..Password Error"
            });
            return;
        }

        const hashedPassword = await hashPassword(password)


        const newAdmin = new Admin({
            name,
            email,
            password:hashedPassword
        })
    
        //* Save the new User
        await newAdmin.save()
    
        res.status(201).json({
            code: 201,
            status: true,
            message: "New Admin registered"
        })
    } catch (error) {
        next(error)
    }
}


const signIn = async(req, res, next) => {
    try {
        const { email, password } = req.body

        //* FInd admin by email
        const admin = await Admin.findOne({ email })
        if(!admin) {
            return res.status(401).json({
                code: 401, 
                status: false,
                message: "Invalid credentials"
            })
        }

        const isPassword = await comparePassword(password,admin.password )
        if(!isPassword) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid credentials"
            })
        }

        //*Genrate JWT
        const token = generateToken(admin)
        
        res.status(200).json({
            code: 200, 
            status: true,
            message: "Admin sign in succesfully",
            token
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUp,
    signIn

}