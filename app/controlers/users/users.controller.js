'use strict';
const User = require('mongoose').model('User');


exports.me = (req, res, next) => {
    res.json(req.user);
}

exports.getAllUsers = (req, res, next) => {
    User.find()
    .select('_id displayName username imageURL')
    .lean()
    .then(users => res.json(users))
    .catch(error => next(error));
}