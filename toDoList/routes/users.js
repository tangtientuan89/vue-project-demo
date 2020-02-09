var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var checkBlacklistToken=require('../middleware/checkBlacklistTokenMiddleware');
let nodemailer = require('nodemailer');


var userMiddleware = require('../middleware/userMiddlleware');
var UserModel = require('../model/UserModel');
var path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//////
router.get('/login', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})


// Login
router.post('/login', function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    console.log('login: ' + username);
    UserModel.find({ username: username }).then(function (value) {
        console.log(value);
        if (value.length <= 0) {
            res.json({
                status: 400,
                message: 'sai tk hoac mk'
            })
        }
        if (value) {
            bcrypt.compare(password, value[0].password, function (err, data) {
                console.log('data ' + value);
                if (data) {
                    console.log('sign ' + value[0].username);
                    var token = jwt.sign({ data: value[0].username }, 'nodemy', { expiresIn: '2h' })
                    var userDecode = jwt.verify(token, 'nodemy');
                    console.log('giai ma ' + userDecode.data);
                    res.json(token)
                }
                else {
                    res.json({
                        status: 400,
                        message: 'sai tk hoac mk'
                    })
                }
            });
        }

    })
})


router.get('/register', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/register.html'))
})


//register account
router.post('/register', function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    UserModel.find({ username: username }).then(function (value) {
        console.log(value.length);
        if (value.length > 0) {
            res.json({
                status: 401,
                message: 'tk da ton tai'
            })
        }
        else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                UserModel.create({ username: username, password: hash })
                    .then(function (value) {
                        let token = jwt.sign({ data: username }, 'verify', { expiresIn: '2h' })
                        let html = `<p>Link nay ton tai trong 1 ngay, click <a href="${req.protocol + '://' + req.get('host')}/verify?token=${token}">Tai day</a></p>`
                        sendMail(username, 'mail verify', html);
                        res.json('register success')
                    })

            })
        }
    })
})


//function sendmail
var sendMail = function (to, subject, html) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'voicoiloichoi@gmail.com',
            pass: '0979581350'
        }
    })

    var mailOptions = function (to, subject, html) {
        let mailOptions = {
            from: 'voicoiloichoi@gmail.com',
            to: to,
            subject: subject,
            html: html
        }
        return mailOptions
    }

    // let mailOptions = {
    //     from: 'voicoiloichoi@gmail.com',
    //     to: username,
    //     subject: 'thu xac thuc',
    //     html: `<p>Link nay ton tai trong 1 ngay, click <a href="${req.protocol + '://' + req.get('host')}/verify?token=${token}">Tai day</a></p>`
    // }

    transporter.sendMail(mailOptions(to, subject, html), function (err, data) {
        if (err) {
            res.json(err)
        } else {
            console.log('thanh cong');
        }
    })
}

//verify acccount
router.post('/verify', function (req, res, next) {
    let token = req.query.token
    let username = jwt.verify(token, 'verify')
    UserModel.updateOne({ username: username.data }, { status: true }).then(function (value) {
        res.json('da verify')
    })
})







// let token=jwt.sign({data},'nodemy',{expiresIn:'10h'})
// res.json({
//     login:true,
//     token:token
// })

// router.get('/cookie',function(req,res,next){
//     getToken=req.query.token
//     var verify=jwt.verify(getToken,'nodemy')
//     res.json(verify)
// })


//api users (admin use)
router.get('/users',checkBlacklistToken.checkBlacklistToken, userMiddleware.userMiddleware, userMiddleware.checkAdminMiddleware, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/users.html'))
})

//create users (admin use)
router.post('/api/users',checkBlacklistToken.checkBlacklistToken, userMiddleware.userMiddleware, userMiddleware.checkAdminMiddleware, function (req, res, next) {
    let username = req.body.username
    let password = req.body.password;
    UserModel.find({ username: username }).then(function (value) {
        if (value.length > 0) {
            res.json({
                status: 401,
                message: 'tk da ton tai'
            })
        }
        else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                UserModel.create({ username: username, password: hash })
                res.json('register success')
            })
        }
    })
})

//delete user (admin use)
router.delete('/api/users',checkBlacklistToken.checkBlacklistToken, userMiddleware.userMiddleware, userMiddleware.checkAdminMiddleware, function (req, res, next) {
    var id = req.query.id
    UserModel.deleteOne({ _id: id })
        .then(function (value) {
            res.json('thanh cong')
        })
})

// forgotPassword
router.post('/forgotPassword', function (req, res, next) {
    let username = req.body.username
    UserModel.find({ username: username })
        .then(function (value) {
            if (value.length > 0) {
                function makePassword(length) {
                    let result = '';
                    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                let password = makePassword(8)  //length randomPassword is 8
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    UserModel.updateOne({ username: username }, { password: hash })
                        .then(function (value) {
                            let html = `<p>new password: ${password} click here to login <a href="${req.protocol + '://' + req.get('host')}/login">Tai day</a></p>`
                            sendMail(username, 'new password', html)
                            res.json('success')
                        })
                })
            } else {
                res.json({
                    status: 400,
                    message: 'account not actived'
                })
            }
        })
})


//reset password
router.post('/resetPassword',checkBlacklistToken.checkBlacklistToken, userMiddleware.userMiddleware, function (req, res, next) {
    let password = req.body.password
    let newPassword = req.body.newpassword
    let username = res.locals.data
    UserModel.find({ username: username })
        .then(function (value) {
            if (value.length > 0) {
                console.log('username '+username);
                console.log('password '+value[0].password);
                bcrypt.compare(password, value[0].password, function (err, value) {
                    console.log('value '+value);
                    if (value) {
                        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                            UserModel.updateOne({ username: username }, { password: hash })
                                .then(function (value) {
                                    res.json('reset password success')
                                })
                        })
                    } else {
                        res.json('wrong password')
                    }

                })
            }
        })
})






module.exports = router
