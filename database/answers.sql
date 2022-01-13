DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL,
  question_id INT,
  body TEXT,
  date_written BIGINT,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);
copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/meilinchen/sei/SDC/answers.csv'
DELIMITER ','
CSV HEADER;
DROP INDEX question_idx;
CREATE INDEX question_idx ON answers USING HASH (question_id);