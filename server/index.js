/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3300;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening as port: ${port}`);
});
