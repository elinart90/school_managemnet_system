const jwt = require('jsonwebtoken')

const generateToken = (name) => {
    const token = jwt.sign({
        _id: name._id,
        name: name.name,
        email: name.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "3d"
    }
)
return token
}

module.exports = generateToken