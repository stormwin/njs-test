'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.signin = (req, res, next) => {
    // User.authenticate({})
};

exports.signup = (req, res, next) => {
    const user = new User();

    user.assign(req.body);

    user.save()
        .then(() => {
            res.json(user);
        })
        .catch(error => res.error(error))
}