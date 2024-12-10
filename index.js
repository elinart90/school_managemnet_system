require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const errorHandler = require('./middleware/errorHandler')
const connectMasterDB = require('./config/db')
const notFound = require('./controller/notFound')
const adminRoute = require("./routes/adminRoute")
const studentRoute = require("./routes/teacherRoute")
const subjectRoute = require("./routes/subjectRoute")
const teacherRoute = require('./routes/teacherRoute')

//* Server config
const app = express()


//* Middleware 
app.use(express.json({ limit: '500mb'}))
app.use(express.urlencoded({ limit: '500mb', extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

//* Routes 
app.use("/api/v1/admin",adminRoute )
app.use('/api/v1/subject', subjectRoute)
app.use('/api/v1/teacher', teacherRoute)
app.use('/api/v1/student', studentRoute)



//* Not found API request routes
app.use("*", notFound)



//* Error handling
app.use(errorHandler)


//* Database
connectMasterDB()



app.listen(process.env.PORT || 8002, () => {
    console.log('Server is running on port', process.env.PORT)
})