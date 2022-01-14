/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
// const db = require('../database/index.js');
const Answers = require('./answers.js');
const Questions = require('./questions.js');

const app = express();
const port = 3300;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from the server side');
});
// get: answers, questions
// post: answers, questions
// put: ansqers report & helpful, questions report & helpful

app.get('/answers', Answers.getAnswers);

app.get('/questions', Questions.getQuestions);

app.listen(port, () => {
  console.log(`Listening as port: ${port}`);
});
