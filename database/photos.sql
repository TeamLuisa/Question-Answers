DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  answer_id INT,
  url VARCHAR (280),
  PRIMARY KEY (id),
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);
copy photos(id, answer_id, url)
FROM '/Users/meilinchen/sei/SDC/answers_photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX answer_idx ON photos USING HASH (answer_id);