const Answer = require('../models/Answers')
const Question = require('../models/Questions')

Question.createMapping(function (err, mapping) {
    if (err) {
        console.log('error creating mapping', err)
    }
    console.log('Mapping Created')
    console.log(mapping)
});

var stream = Question.synchronize();
var count = 0;

stream.on('data', function () {
    count++;
})
stream.on('close', function () {
    console.log(`Indexed ${count} documents`)
})
stream.on('error', function (err) {
    console.log(err)
})


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
