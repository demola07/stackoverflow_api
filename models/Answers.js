const mongoose = require('mongoose')

const Schema = mongoose.Schema

const answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        required: [true, 'Please selete a question'],
        ref: 'Question'
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    answer: {
        type: String,
        required: [true, 'Please enter your answer']
    },

}, { timestamps: true })

module.exports = mongoose.model('Answer', answerSchema)