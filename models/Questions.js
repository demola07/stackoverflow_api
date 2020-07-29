const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

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

questionSchema.plugin(mongoosastic, {
    hosts: [
        'localhost:9200'
    ]
})

module.exports = mongoose.model('Question', questionSchema)