/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const pgp = require('pg-promise')();

const credentials = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  password: '',
  user: 'postgres',
};

const db = pgp(credentials);
module.exports = db;
