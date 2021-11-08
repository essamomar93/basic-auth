'use strict';
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { Users } = require('./models/index');



Router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
        const record = await Users.create(req.body);
        res.status(201).json(record);

    } catch (e) { res.status(403).send("Error Creating User"); }
});


Router.post('/signin', async (req, res) => {
    try {
        const encodedHeaders = req.headers.authorization.split(' ')[1];
        const [username, password] = base64.decode(encodedHeaders).split(':');
        const user = await Users.findOne({ where: { username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            res.status(500).json({ 'error': 'username or password incorrect!' })
        }
    } catch (error) {
        res.status(403).send("An Error Occurred!");
    }
});


module.exports = Router;