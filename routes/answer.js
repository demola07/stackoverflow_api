const express = require('express')

const router = express.Router()

const { createAnswer, getAnswers } = require('../controllers/answer')

router
    .route('/').get(getAnswers)

router
    .route('/:questionId').post(createAnswer)


module.exports = router