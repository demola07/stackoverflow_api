const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    question: {
        type: String,
        required: [true, 'Please enter a question']
    },

}, { timestamps: true })

module.exports = mongoose.model('Question', questionSchema)