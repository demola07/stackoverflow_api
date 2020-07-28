const Answer = require('../models/Answers')
const Question = require('../models/Questions')


exports.createQuestion = async (req, res, next) => {
    const { name, question } = req.body

    const newQuestion = await new Question({
        name, question
    })

    const data = await newQuestion.save()
    res.status(201).json(data)

}

exports.getQuestions = async (req, res, next) => {
    const data = await Question.find()

    res.status(200).json(data)

}
