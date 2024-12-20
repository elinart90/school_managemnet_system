const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "teacher", "parent"],
        default: "student",
        required: true
    },
    // notification: {
    //     type: mongoose.Schema.Tyeps.ObjectId,
    //     ref: "Notification"
    // },
    verificationCode: {
        type: {
            String
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPassword: {
        type: {
            String
        }
    },
    profilePic: {
        type: mongoose.Types.ObjectId,
        ref: "File"
    }
}, { timestamps: true } )

const User = mongoose.model("User", userSchema)

module.exports = User