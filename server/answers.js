/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const db = require('../database/index.js');

module.exports.getAnswers = async (req, res) => {
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
  response.results = await db.query(qry).catch((err) => {
    res.send(err);
  });
  for (let answer of response.results) {
    if (answer.photos[0].id === null) {
      answer.photos = [];
    }
  }
  res.send(response);
};

// module.exports.postAns = async(req, res) => {
//   // lll
// };
