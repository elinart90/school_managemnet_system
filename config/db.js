const mongoose = require("mongoose")


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("Database connected successfully")
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
// }


// module.exports = connectDB

const connectMasterDB = async () => {
    const masterDBUri = process.env.MONGO_URI;
    const connecttion = await mongoose.connect(masterDBUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    console.log("Connected to Master DB")
    return connecttion
}

module.exports = connectMasterDB