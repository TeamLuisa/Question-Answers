/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
// require('newrelic');
const express = require('express');
const compression = require('compression');
const Answers = require('./answers.js');
const Questions = require('./questions.js');

const app = express();
const port = 3300;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello from the server side');
});

app.get('/answers', Answers.getAnswers);

app.get('/questions', Questions.getQuestions);

app.post('/answers', Answers.postAnswer);

app.post('/questions', Questions.postQuestion);

app.put('/answers/helpful', Answers.updateHelpful);

app.put('/questions/helpful', Questions.updateHelpful);

app.put('/answers/report', Answers.updateReport);

app.put('/questions/report', Questions.updateReport);

app.listen(port, () => {
  console.log(`Listening as port: ${port}`);
});
