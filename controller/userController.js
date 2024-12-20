const User = require('../models/userModel')
const hashPassword = require('../utilities/hashPassword')
const comparePassword = require('../utilities/comparePassword')
const generateToken = require('../utilities/generateToken')
const generateCode = require('../utilities/studentCode')


//* Sign up user
const signupUser = async(req, res, next) => {
    try {
        const { name, email, password } = req.body

        //* Email check
        const isEmailExist = await User.findOne({ email })

        if(isEmailExist)  {
            return res.status(400).json({
                message: "Email already exist"
            })
        }

        //* Creating a strong password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                message: "Password must be at least 6 characters "
            });
            return;
        }

        //* Hashing password
        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        //*save new user 
        res.status(201).json({
            code: 201,
            status: true,
            message: "User registered successfully"
        })

        
    } catch (error) {
        next(error)
    }
}


const signInUser = async(req, res, next) => {
    try {
        const { email, password } = req.body

        //*Find user by email
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid credentials"
            })
        }

        //* Check password 
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid credentials"
            })
        }

        //** Generate token */
        const token = generateToken(user)

        //* send a succesfull message
        res.status(200).json({ 
            code: 200,
            status: true,
            message: "User sign in successfully",
            token
        })
        
    } catch (error) {
        next(error)
    }
}

const sendVerificationCode = async(req, res, next) => {
    try {
        const { email } = req.body
        
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        //* user already verified
        if(user.isVerified) {
            return res.status(400).json({
                message: "User already verified"
            })
        }

        //* Generate code
        const code = generateCode(6)
        user.verificationCode = code
        await user.save()


        //* send Email
        


        //* send success message
        res.status(200).json({
            code: 200,
            status: true,
            message: "User verification code sent successfully"
        })
        
    } catch (error) {
        next(error)
    }
}


const verifyUser = async(req, res, next) => {
    try {
        const { email, code } = req.body

        //*Find user by email
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: "User not found"
            })
        }

        //* Check if verification matches
        if(user.verificationCode !== code ) {
            return res.status(400).json({
                message: "Invalid code"
            })
        }

        //* Mark the user as verified
        user.isVerified = true;
        user.verificationCode = null

        //* save 
        await user.save()

        //* send success response
        res.status(200).json({
            code: 200,
            status: true,
            message: "Verification was successful"
        })
        
    } catch (error) {
        next(error)
    }
}


const forgotCode = async(req, res, next) => {
    try {
        const { email } = req.body

        //* find
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const code = generateCode(6)

        user.forgotPassword = code
        await user.save()

        //* send email


        //* send success message
        res.status(200).json({
            code: 200,
            status: true,
            message: "Your code have been sent successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

const recoverPassword = async(req, res, next) => {
    try {
        const { email, code, password } = req.body


        //*Email check
        const user = await User.findOne({ email })
        if(!user)  {
            return res.status(400).json({
                message: "User not found"
            })
        }

        //* CODE CHECK 
        if(user.forgotPassword !== code) {
            return res.status(400).json({
                message: "Invalid code"
            })
        }

        //*hash password
        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        user.forgotPassword = null

        await user.save()

        //* send success message
        res.status(200).json({
            code: 200,
            status: true,
            message: "New password set successfully"
        })
        
        
    } catch (error) {
        next(error)
    }
}


const changedPassword = async(req, res, next) => {
    try {
        const { oldPassword, newPasswrod } = req.body
        const { _id } = req.user

        //* ID check
        const user = await User.findOne(_id)
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        

        //* Check password match
        const match = await comparePassword(oldPassword, user.password) 
        if(!match) {
            return res.status(400).json({
                message: "You are providing an old password"
            })
        }

        //* Hash Password
        const hashedPassword = await hashPassword(newPasswrod)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({
            message: "Pasword chnaged successfully"
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signupUser,
    signInUser,
    sendVerificationCode,
    verifyUser,
    forgotCode,
    recoverPassword,
    changedPassword
}  