/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const db = require('../database/index.js');

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
app.get('/answers', async (req, res) => {
  const response = {};
  response.question = req.query.question_id;
  const qry = `
  SELECT answers.id as answer_id,
  answers.body,
  to_timestamp(answers.date_written/1000) as date,
  answers.answerer_name, answers.helpful as helpfulness,
  json_agg(json_build_object('id', photos.id, 'url', photos.url)) AS photos
  FROM answers LEFT JOIN photos ON photos.answer_id = answers.id
  WHERE question_id = ${req.query.question_id} GROUP BY answers.id
  LIMIT 20
  `;
  await db
    .query(qry)
    .then((data) => {
      data.forEach((answer) => {
        if (answer.photos[0].id === null) {
          answer.photos = [];
        }
      });
      response.results = data;
      return response;
    })
    .then(() => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening as port: ${port}`);
});
