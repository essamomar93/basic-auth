'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users=require('../models/users-model')

module.exports = async (req, res, next) => {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    if (username && password) {
        const user = await Users.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            next();
        } else {
            next('wrong password');
        }
    } else {
        next('Invalid User');
    }
};
