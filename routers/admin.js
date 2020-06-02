const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const checkUsers = require("../middleware/checkUsers");
const UserModel = require("../model/UserModel");
const DoListModel = require("../model/DoList");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;
//////

//get all user(admin use)
// router.get('/api/admin', checkUsers, function (req, res, next) {
//     if (req.locals.type == 1) {
//         UserModel.find({ type: 3 })
//             .then(function (data) {
//                 res.json({
//                     code: 200,
//                     data: data,
//                     message: 'success'
//                 })
//             })
//             .catch(function (err) {
//                 res.json({
//                     message: err
//                 })
//             })
//     } else {
//         res.json({
//             message: 'not admin'
//         })
//     }
// })
//search users(admin use)
router.get("/api/admin", checkUsers, function (req, res, next) {
  if (req.locals.type == 1) {
    let search = req.query.search;
    console.log("search", search);
    UserModel.find({ email: { $regex: `${search}` }, type: 3 })
      .then(function (data) {
        res.json({
          code: 200,
          data: data,
          message: "success",
        });
      })
      .catch(function (err) {
        res.json({
          code: 404,
          error: err,
          message: err,
        });
      });
  } else {
    res.json({
      code: 404,
      error: null,
      message: "not admin",
    });
  }
});
//delete user (admin use)
router.delete("/api/admin", checkUsers, function (req, res, next) {
  if (req.locals.type == 1) {
    var id = req.query.id;
    UserModel.deleteOne({ _id: id })
      .then(function (value) {
        return DoListModel.deleteMany({ author: id });
      })
      .then(function (value) {
        res.json({
          code: 200,
          message: "delete success",
        });
      })
      .catch(function (err) {
        res.json({
          code: 404,
          error: err,
          message: err,
        });
      });
  } else {
    res.json({
      code: 404,
      error: null,
      message: "not admin",
    });
  }
});

//block,atived user (admin use)
router.put("/api/admin", checkUsers, function (req, res, next) {
  if (req.locals.type == 1) {
    let id = req.query.id;
    let status = req.query.status;
    console.log("id status",id,status)
    UserModel.findByIdAndUpdate({ _id: id }, { status: `${status}` })
      .then(function (value) {
        res.json({
          message: "blocked user success",
        });
      })
      .catch(function (err) {
        res.json({
          message: err,
        });
      });
  } else {
    res.json({
      message: "not admin",
    });
  }
});

module.exports = router;
