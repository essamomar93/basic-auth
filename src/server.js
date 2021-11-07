'use strict';
const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const Collection = require('./middleware/model-finder')

const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

const router = require('./auth/router')
const { Sequelize, DataTypes } = require('sequelize');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('*', notFoundHandler);
app.use(errorHandler);


function start() {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  }

const sequelize = new Sequelize('postgres:localhost:5432/creatuser');


const Users = require('./auth/models/users-model');

const userModel = Users(sequelize, DataTypes);

const userCollection = new Collection(userModel);

module.exports = {
    server: app,
    start: start,
    db: sequelize,
    userCollection:userCollection
}