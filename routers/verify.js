const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const UserModel = require('../model/UserModel');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//////

//verify acccount

router.get('/verify', function (req, res, next) {
    let token = req.query.token
    let email = jwt.verify(token, 'verify')
    UserModel.updateOne({ email: email.email },{$set:{ verified: true ,status:'actived'}})
    .then(function (value) {
        res.status(200).json('verified')
    })
    .catch(function(err){
        res.json({
            message:err
        })
    })
})

module.exports=router;