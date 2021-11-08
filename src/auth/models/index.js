'use strict';
require('dotenv').config();

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');


let seqOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl:
        {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URI, seqOptions);

const Users = require('./users-model')

module.exports = {
    db: sequelize,
    Users: Users(sequelize, DataTypes),
    sequelize,
     DataTypes
}