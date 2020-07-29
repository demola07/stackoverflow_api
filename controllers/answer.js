const Answer = require('../models/Answers')
const asyncHandler = require('../middleware/async');

Answer.createMapping(function (err, mapping) {
    if (err) {
        console.log('error creating mapping', err)
    }
    console.log('Mapping Created')
    console.log(mapping)
});

const stream = Answer.synchronize();
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
        Answer.search({
            query_string: { query: req.query.q }
        }, function (err, results) {
            if (err) return next(err)
            const data = results.hits.hits.map(function (hit) {
                return hit;
            })
            res.status(200).json(data)
        })
    }
})


exports.createAnswer = asyncHandler(async (req, res, next) => {
    const question = req.params.questionId

    const { name, answer } = req.body

    const newAnswer = await new Answer({
        name, answer, question
    })

    const data = await newAnswer.save()
    res.status(201).json(data)
});


