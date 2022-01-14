/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
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

// find last answer id, newly added answer will be id.max[0] + 1
// find last photo id, ...
// insert new answer data...
// if photo array is empty, don't insert new photo data
// if else, iterate each url of photo array
// new photo id each round, but same answer id, insert new photo data...
module.exports.postAnswer = async (req, res) => {
  const question_id = req.query.question_id;
  const { body, name, email, photos } = req.body;
  const qryAns = `
  INSERT INTO answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const qryPhoto = `
  INSERT INTO photos(id, answer_id, url) VALUES($1, $2, $3)
  `;
  const answer_id = await db
    .query('SELECT MAX(id) FROM answers')
    .catch((err) => {
      res.send(err);
    });
  const photo_id = await db.query('SELECT MAX(id) FROM photos').catch((err) => {
    res.send(err);
  });
  await db
    .none(qryAns, [
      answer_id[0].max + 1,
      question_id,
      body,
      Date.now(),
      name,
      email,
      false,
      0,
    ])
    .then(() => {
      if (photos && photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          db.none(qryPhoto, [
            photo_id.max[0] + 1 + i,
            answer_id[0].max + 1,
            photos[i],
          ]).catch(() => {
            res.sendStatus(500);
          });
        }
      }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

// putHelpful
// putReport
