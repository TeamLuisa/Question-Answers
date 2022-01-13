DROP TABLE IF EXISTS photos, answers, questions;

CREATE TABLE questions (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  body TEXT,
  date_written BIGINT,
  asker_name VARCHAR (50),
  asker_email VARCHAR (50),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id)
);

copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/meilinchen/sei/SDC/questions.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX product_idx ON questions USING HASH (product_id);