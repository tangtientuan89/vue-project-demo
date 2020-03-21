const express = require('express');
const router = express.Router();
const checkUsers = require('../middleware/checkUsers');
const UserModel = require('../model/UserModel');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//////
router.get('/change-password', checkUsers, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/changePassword.html'))
})
//change password
router.post('/change-password', checkUsers, function (req, res, next) {
    let password = req.body.password
    let newPassword = req.body.newPassword
    let email = req.locals.email
    UserModel.findOne({ email: email })
        .then(function (data) {
            if (data) {
                return bcrypt.compare(password, data.password)
            }
            else {
                throw 'cant find account'
            }
        })
        .then(function (boolean) {
            if (boolean) {
                return bcrypt.hash(newPassword, saltRounds)
            }
            else {
                throw 'wrong password'
            }
        })
        .then(function (hash) {
            return UserModel.updateOne({ email: email }, { password: hash })
        })
        .then(function (value) {
            res.json({
                code: 200,
                message: 'change password success'
            })
        })
        .catch(function (err) {
            res.json({
                code: 404,
                error: err,
                message: err
            })
        })
    })
    module.exports = router;