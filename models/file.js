const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    size: Number,
    mimetype: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const File = mongoose.model("File", fileSchema)

module.exports = File