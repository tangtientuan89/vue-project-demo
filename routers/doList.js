const express = require('express');
const router = express.Router();
const path = require('path');
const DoListModel = require('../model/DoList');
const checkUsers = require('../middleware/checkUsers');
/* GET users listing. */

router.get('/do-list', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/doList.html'))

})

//get total from db
router.get('/api/total', checkUsers, function (req, res, next) {
  console.log('req.locals._id',req.locals._id);
  DoListModel.find({ author: req.locals._id })
    .then(function (data) {
      console.log('data',data);
      let total = data.length
      console.log('total ', total);
      res.json(total)
    })
    .catch(function (err) {
      res.json({
        message: err
      })
    })
})

//get do list
router.get('/api/do-list', checkUsers, function (req, res, next) {
  var pagesNum = parseInt(req.query.pages) || 1
  DoListModel.find({ author: req.locals._id })
    .skip((pagesNum - 1) * 5)
    .limit(5)
    .exec()
    .then(function (value) {
      res.json(value)
    })
})

//create do list
router.post('/api/do-list', checkUsers, function (req, res, next) {
  let title = req.body.title
  let content = req.body.content
  let author = req.locals._id
  console.log('locals: ');
  DoListModel.create({ title: title, content: content, author: author })
    .then(function (value) {

      res.json(value)
    })
    .catch(function(err){
      res.json({message:err})
    })
})

//update do list
router.put('/api/do-list', checkUsers, function (req, res, next) {

  var id = req.query.id
  var content = req.body.content
  DoListModel.update({ _id: id }, { content: content })
    .then(function (value) {
      res.json(value)
    })
    .catch(function(err){
      res.json({
        code:404,
        error:err,
        message:err
      })
    })

})

//delete do list
router.delete('/api/do-list', checkUsers, function (req, res, next) {
  var id = req.query.id
  DoListModel.deleteOne({ _id: id })
    .then(function (value) {
      res.json(value)
    })
    .catch(function(err){
      res.json({
        code:404,
        error:err,
        message:err
      })
    })
})



module.exports = router;
