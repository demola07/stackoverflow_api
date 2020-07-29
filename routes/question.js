const express = require('express')
// const cleanCache = require('../middleware/cleanCache')

const router = express.Router()

const { createQuestion, search, searchQuestions } = require('../controllers/question')

router
    .route('/search').get(search)

router
    .route('/').post(createQuestion)





module.exports = router