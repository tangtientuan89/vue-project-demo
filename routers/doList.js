const express = require("express");
const router = express.Router();
const path = require("path");
const DoListModel = require("../model/DoList");
const checkUsers = require("../middleware/checkUsers");
/* GET users listing. */

router.get("/do-list", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/doList.html"));
});

//get total from db
router.get("/api/total", checkUsers, function(req, res, next) {
  let search = req.query.search;
  DoListModel.find({ title: { $regex: `${search}` }, author: req.locals._id })
    .then(function(data) {
      console.log("data", data);
      let total = data.length;
      console.log("total ", total);
      res.json(total);
    })
    .catch(function(err) {
      res.json({
        message: err
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
router.get("/api/do-list", checkUsers, function(req, res, next) {
  let search = req.query.search;
  let pagesNum = parseInt(req.query.pages) || 1;
  DoListModel.find({ title: { $regex: `${search}` }, author: req.locals._id })
    .skip((pagesNum - 1) * 5)
    .limit(5)
    .exec()
    .then(function(data) {
      res.json({
        code: 200,
        data: data,
        message: "success"
      });
    })
    .catch(function(err) {
      res.json({
        code: 404,
        error: err,
        message: err
      });
    });
});

//create do list
router.post("/api/do-list", checkUsers, function(req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let author = req.locals._id;
  console.log("locals: ");
  DoListModel.create({ title: title, content: content, author: author })
    .then(function(value) {
      res.json(value);
    })
    .catch(function(err) {
      res.json({ message: err });
    });
});

//update do list
router.put("/api/do-list", checkUsers, function(req, res, next) {
  let id = req.query.id;
  let content = req.body.content;
  DoListModel.update({ _id: id }, { content: content })
    .then(function(value) {
      res.json(value);
    })
    .catch(function(err) {
      res.json({
        code: 404,
        error: err,
        message: err
      });
    });
});

//delete do list
router.delete("/api/do-list", checkUsers, function(req, res, next) {
  let id = req.query.id;
  DoListModel.deleteOne({ _id: id })
    .then(function(value) {
      res.json(value);
    })
    .catch(function(err) {
      res.json({
        code: 404,
        error: err,
        message: err
      });
    });
});

module.exports = router;
