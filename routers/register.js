const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendMail = require('../config/sendMailOpt');
const UserModel = require('../model/UserModel');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;




router.get('/register', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/register.html'))
})


//register account
router.post('/register', function (req, res, next) {
    let email = req.body.email
    let password = req.body.password
    console.log('email',email);
    UserModel.findOne({ email: email })
        .then(function (value) {
            if (value) {
                res.json({
                    message: 'tk da ton tai'
                })
            }
            else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    UserModel.create({ email: email, password: hash })
                        .then(function (value) {
                            let token = jwt.sign({ email: email }, 'verify', { expiresIn: '24h' })
                            let html = `<p>Link nay ton tai trong 1 ngay, click <a href="${req.protocol + '://' + req.get('host')}/verify?token=${token}">Tai day</a></p>`
                            sendMail(email, 'mail verify', html);
                            res.json({
                                message:'register success'
                            })
                        }).catch(function (err) {
                            res.json({
                                message: err
                            })
                        })

                })
            }
        })
        .catch(function (err) {
            res.json({
                message: err
            })
        })
})



module.exports = router;