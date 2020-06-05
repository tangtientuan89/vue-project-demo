const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendMail = require('../config/sendMailOpt');
const UserModel = require('../model/UserModel');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//register account
router.post('/register', function (req, res, next) {
    let email = req.body.email
    let password = req.body.password
    console.log('email', email);
    UserModel.findOne({ email: email })
        .then(function (value) {
            if (!value) {
                return bcrypt.hash(password, saltRounds)
            }
            else {
                throw 'tk da ton tai'
            }
        })
        .then(function (hash) {
            return UserModel.create({ email: email, password: hash })
        })
        .then(function (value) {
            let token = jwt.sign({ email: email }, 'verify', { expiresIn: '24h' })
            let html = `<p>Link nay ton tai trong 1 ngay, click <a href="${req.protocol + '://' + req.get('host')}/verify?token=${token}">Tai day</a></p>`
            sendMail(email, 'mail verify', html);
            res.json({
                code:200,
                message: 'register success'
            })
        }).catch(function (err) {
            res.json({
                code:404,
                error:err,
                message: err
            })
        })
})

module.exports = router;