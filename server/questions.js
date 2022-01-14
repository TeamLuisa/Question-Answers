/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const db = require('../database/index.js');

module.exports.getQuestions = async (req, res) => {
  const response = {};
  response.product_id = req.query.product_id;
  const qryQ = `
  SELECT id as question_id,
  body as question_body,
  to_timestamp(date_written/1000) as question_date,
  asker_name, helpful as question_helpfulness, reported
  FROM questions WHERE product_id = ${req.query.product_id} LIMIT 50`;

  response.results = await db.query(qryQ).catch((err) => {
    res.send(err);
  });

  for (let q of response.results) {
    q.answers = {};
    const qryA = `
    SELECT answers.id, answers.body,
    to_timestamp(answers.date_written/1000) as date,
    answers.answerer_name, answers.helpful as helpfulness,
    json_agg(photos.url) AS photos
    FROM answers LEFT JOIN photos ON photos.answer_id = answers.id
    WHERE question_id = ${q.question_id} GROUP BY answers.id LIMIT 20
    `;
    let answers = await db.query(qryA).catch((err) => {
      res.send(err);
    });
    for (let a of answers) {
      if (a.photos[0] === null) {
        a.photos = [];
      }
      q.answers[JSON.stringify(a.id)] = a;
    }
  }
  res.send(response);
};

// module.exports.postQuestion = async(req, res) => {
// // lll
// };
