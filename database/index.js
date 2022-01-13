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

// // check if db connected
// db.connect()
//   .then((obj) => {
//     // Can check the server version here (pg-promise v10.1.0+):
//     console.log('pgp connected!');
//     obj.done(); // success, release the connection;
//   })
//   .catch((error) => {
//     console.log('ERROR:', error.message || error);
//   });

module.exports = db;
