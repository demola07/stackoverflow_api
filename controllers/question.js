const Question = require('../models/Questions')
const asyncHandler = require('../middleware/async');

Question.createMapping(function (err, mapping) {
    if (err) {
        console.log('error creating mapping', err)
    }
    console.log('Mapping Created')
    console.log(mapping)
});

const stream = Question.synchronize();
let count = 0;

stream.on('data', function () {
    count++;
})
stream.on('close', function () {
    console.log(`Indexed ${count} documents`)
})
stream.on('error', function (err) {
    console.log(err)
})



exports.search = asyncHandler((req, res, next) => {
    if (req.query.q) {
        Question.search({
            query_string: { query: req.query.q }
        }, function (err, results) {
            if (err) return next(err)
            const data = results.hits.hits.map(function (hit) {
                return hit;
            })
            res.status(200).json(data)
        })
    }
});

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const { name, question } = req.body

    const newQuestion = await new Question({
        name, question
    })

    const data = await newQuestion.save()
    res.status(201).json(data)

});

// exports.getQuestions = async (req, res, next) => {
//     const data = await Question.find()

//     res.status(200).json(data)

// }
