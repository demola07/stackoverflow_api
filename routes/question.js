const express = require('express')
// const cleanCache = require('../middleware/cleanCache')

const router = express.Router()

const { createQuestion, getQuestions } = require('../controllers/question')

router
    .route('/').get(getQuestions).post(createQuestion)



module.exports = router