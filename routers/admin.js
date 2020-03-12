const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const checkUsers = require('../middleware/checkUsers');
const UserModel = require('../model/UserModel');
const DoListModel = require('../model/DoList');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//////

//api users (admin use)
router.get('/admin', checkUsers, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/admin.html'))
})


router.get('/api/admin', checkUsers, function (req, res, next) {
    if (req.locals.type == 1) {
        UserModel.find({ type: 3 })
            .then(function (user) {
                res.json(user)
            })
            .catch(function (err) {
                res.json({
                    message: err
                })
            })
    } else {
        res.json({
            message: 'not admin'
        })
    }
})
//delete user (admin use)
router.delete('/api/admin/:id', checkUsers, function (req, res, next) {
    if (req.locals.type == 1) {
        var id = req.params.id
        UserModel.deleteOne({ _id: id })
            .then(function (value) {
                DoListModel.deleteMany({ author: id })
                    .then(function (value) {
                        res.json({
                            message: 'delete success'
                        })
                    })
                    .catch(function (err) {
                        res.json({
                            message: err
                        })
                    })
            })
            .catch(function (err) {
                res.json({
                    message: err
                })
            })

    } else {
        res.json({
            message: 'not admin'
        })
    }

})

//block,atived user (admin use)
router.put('/api/admin/:id/:status', checkUsers, function (req, res, next) {
    if (req.locals.type == 1) {
        let id = req.params.id
        let status = req.params.status
        UserModel.findByIdAndUpdate({ _id: id }, { status: `${status}` })
            .then(function (value) {
                res.json({
                    message: 'blocked user success'
                })
            })
            .catch(function (err) {
                res.json({
                    message: err
                })
            })
    } else {
        res.json({
            message: 'not admin'
        })
    }

})




module.exports = router
