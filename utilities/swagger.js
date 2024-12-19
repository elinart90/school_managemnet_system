const swaggerJSDoc = require('swagger-jsdoc')


//* swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "My School Management System API",
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:4010',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
module.exports = swaggerDocs 