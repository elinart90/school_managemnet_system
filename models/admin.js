const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }, 
    verificationCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPassword: {
        type: String
    },
    profilePic: {
        type: mongoose.Types.ObjectId,
        ref: "File"
    }
}, { timestamps: true })


const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin