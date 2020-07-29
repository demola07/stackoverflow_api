require('dotenv').config()
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
// dotenv.config({ path: './config/config.env' });

// Load models
const Question = require('./models/Questions');
const Answer = require('./models/Answers');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

//   Read JSON file
const questions = JSON.parse(fs.readFileSync(`${__dirname}/_data/questions.json`, 'utf-8'));

const answers = JSON.parse(fs.readFileSync(`${__dirname}/_data/answers.json`, 'utf-8'));


// Import into DB
const importData = async () => {
    try {
        await Question.create(questions);
        await Answer.create(answers);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Question.deleteMany();
        await Answer.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
