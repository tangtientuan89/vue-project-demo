const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const checkUsers = require('../middleware/checkUsers');
const UserModel = require('../model/UserModel');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//////
router.get('/change-password',checkUsers,function(req,res,next){
    res.sendFile(path.join(__dirname,'../views/changePassword.html'))
})
//change password
router.post('/change-password', checkUsers, function (req, res, next) {
    let password = req.body.password
    let newPassword = req.body.newPassword
    let email = req.locals.email
    UserModel.findOne({ email: email })
        .then(function (data) {
            if (data) {
                bcrypt.compare(password, data.password, function (err, value) {
                    if (value) {
                        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                            UserModel.updateOne({ email: email }, { password: hash })
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
                    } else {
                        res.json({
                            code: 404,
                            error: err,
                            message: 'wrong password'
                        })
                    }
                })
            }
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