require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const colors = require('colors')

const app = express()

// Body Parser
app.use(express.json())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on PORT:${process.env.PORT}`.yellow.bold
    )
)

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)

    //Close server & exit process
    server.close(() => process.exit(1))
})