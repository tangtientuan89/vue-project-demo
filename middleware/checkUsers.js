const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const arrBlacklistToken = require('../config/blacklistToken');

module.exports = function userMiddleware(req, res, next) {
    try {
        var token = req.cookies.token || req.headers.authorization.trim().split(' ')[1]
        if (token) {
            if (arrBlacklistToken.includes(token)) {
                return res.json({
                    message: 'token has been blacklisted'
                })
            }
            let userDecode = jwt.verify(token, 'nodemy');
            UserModel.findOne({ email: userDecode.email })
                .then(function (user) {
                    if (user.verified == false) {
                        throw 'Account unverified, Please check email.'
                    }
                    if (user.status == 'blocked') {
                        throw 'account has been blocked'
                    }
                    console.log('user ',user);
                    req.locals = user;
                    return next();
                })
                .catch(function (err) {
                    return res.json({
                        code: 404,
                        error: err,
                        message: err
                    })
                })
        }
        else {
            return res.redirect('/login')
        }
    } catch (err) {
        res.redirect('/login')
    }


}

// function checkAdminMiddleware(req, res, next) {
//     console.log('tk :' + req.locals.data);
//     UserModel.findOne({ email: req.locals.data })
//         .then(function (value) {
//             console.log(value);
//             if (value.type == 1) {
//                 next()
//             }
//             else {
//                 res.json('not admin')
//             }
//         })
//         .catch(function (err) {
//             res.json({
//                 message: err
//             })
//         })

// }


