const express = require('express')

const router = express.Router()

const { createAnswer, search } = require('../controllers/answer')

router
    .route('/search').get(search)

router
    .route('/:questionId').post(createAnswer)


module.exports = router