const express = require("express");
const router = express.Router();
const path = require("path");
const DoListModel = require("../model/DoList");
const checkUsers = require("../middleware/checkUsers");
/* GET users listing. */

//get total from db
router.get("/api/total", checkUsers, function (req, res, next) {
  let search = req.query.search;
  DoListModel.find({ title: { $regex: `${search}` }, author: req.locals._id })
    .then(function (data) {
      console.log("data", data);
      let total = data.length;
      console.log("total ", total);
      res.json(total);
    })
    .catch(function (err) {
      res.json({
        message: err,
      });
    });
});

//get do list
// router.get("/api/do-list", checkUsers, function(req, res, next) {
//   let pagesNum = parseInt(req.query.pages) || 1;
//   DoListModel.find({ author: req.locals._id })
//     .skip((pagesNum - 1) * 5)
//     .limit(5)
//     .exec()
//     .then(function(value) {
//       res.json(value);
//     });
// });

//seach
router.get("/api/to-do-list", checkUsers, function (req, res, next) {
  let search = req.query.search||'';
  // let pagesNum = parseInt(req.query.pages) || 1;
  DoListModel.find({ title: { $regex: `${search}` }, author: req.locals._id })
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
});

//create do list
router.post("/api/to-do-list", checkUsers, function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let author = req.locals._id;
  console.log("locals: ", req.body);
  console.log("locals2: ", author);
  DoListModel.create({ title: title, content: content, author: author })
    .then(function (data) {
      res.json({
        code: 200,
        data: data,
        message: "success",
      });
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

//update do list
router.put("/api/to-do-list", checkUsers, function (req, res, next) {
  let id = req.query.id;
  let content = req.body.content;
  let title = req.body.title;
  DoListModel.update({ _id: id }, { title: title, content: content })
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
});

//delete do list
router.delete("/api/to-do-list", checkUsers, function (req, res, next) {
  let id = req.query.id;
  console.log('id',id)
  DoListModel.deleteOne({ _id: id })
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
});

module.exports = router;
