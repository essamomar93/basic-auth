'use strict';
const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

const Router = require('./auth/router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.use('*', notFoundHandler);
app.use(errorHandler);


function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}
module.exports = {
  server: app,
  start: start,
};
