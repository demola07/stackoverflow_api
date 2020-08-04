const express = require('express')
// const cleanCache = require('../middleware/cleanCache')

const router = express.Router()

const { createQuestion, search, getQuestions } = require('../controllers/question')

router
    .route('/search').get(search)

router.route('/getQuestions').get(getQuestions)

router
    .route('/').post(createQuestion)


module.exports = router