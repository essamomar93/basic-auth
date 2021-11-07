'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {userCollection} = require('../server')



router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
        const record = await userCollection.create(req.body);
        console.log( req.body);
        res.status(201).json(record);

    } catch (e) { res.status(403).send("Error Creating User"); }
});


router.post('/signin', async (req, res) => {
    try {
        const user = await userCollection.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        }
        else {
            throw new Error('Invalid User')
        }
    } catch (error) { res.status(403).send("Invalid Login"); }

});

module.exports=router;