var jwt = require('jsonwebtoken');
var UserModel=require('../model/UserModel');

function userMiddleware(req, res, next) {
    var token = req.cookies.token|| //req.headers.cookie.split('=')[1]
    console.log('cookie '+req.cookies.token);
    if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1]
    }
    if (token) {
        var userDecode = jwt.verify(token, 'nodemy');
        console.log('userDecode: '+userDecode.data);
        res.locals = userDecode;
        next();
    }
    else {
        res.redirect('/login')
    }
}

function checkAdminMiddleware(req, res, next) {
    console.log('tk :'+ res.locals.data);
    UserModel.find({username:res.locals.data})
    .then(function(value){
        console.log(value);
        if (value[0].type == 1) {
            next()
        }
        else {
            res.json('not admin')
        }
    })
    
}


module.exports = {
    userMiddleware,
    checkAdminMiddleware
}