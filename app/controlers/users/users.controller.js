'use strict';


exports.requiresLogin = (req, res, next) => {
    console.log(req);
    console.log(req.isAuthenticated())

    res.json({});
}