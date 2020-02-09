var express = require('express');
var router = express.Router();
var path=require('path');
var db=require('../model/TaskModel');
var userMiddleware=require('../middleware/userMiddlleware');
var checkBlacklistToken=require('../middleware/checkBlacklistTokenMiddleware');
/* GET users listing. */


router.get('/task',checkBlacklistToken.checkBlacklistToken, userMiddleware.userMiddleware, function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/task.html'))

})

router.get('/api/total',checkBlacklistToken.checkBlacklistToken,userMiddleware.userMiddleware,function(req,res,next){
  db.estimatedDocumentCount(function(err,count){
    res.json(count)
  })	
})

router.get('/api/task',checkBlacklistToken.checkBlacklistToken,userMiddleware.userMiddleware,function(req,res,next){
  var pagesNum =parseInt(req.query.pages)||1
  db.find({})
  .skip((pagesNum-1)*5)
  .limit(5)
  .exec()
  .then(function(value){
    res.json(value)
  })
})

router.post('/api/task',checkBlacklistToken.checkBlacklistToken,userMiddleware.userMiddleware,function(req,res,next){
  var title=req.body.title
  var content=req.body.content
  console.log('locals: ');
  db.create({title:title,content:content})
  .then(function(value){
    
    res.json(value)
  })
})

router.put('/api/task',checkBlacklistToken.checkBlacklistToken,userMiddleware.userMiddleware,function(req,res,next){
  
  var id =req.query.id
  var content=req.body.content
  db.update({_id:id},{content:content})
  .then(function(value){
    res.json(value)
  })
  
})

router.delete('/api/task',checkBlacklistToken.checkBlacklistToken,userMiddleware.userMiddleware,function(req,res,next){
  var id =req.query.id
  db.deleteOne({_id:id})
  .then(function(value){
    res.json(value)
  })
})


router.post('/logout',function(req,res,next){
  var token=req.cookies.token
  checkBlacklistToken.arrBlacklistToken.push(token)
  console.log(checkBlacklistToken.arrBlacklistToken);
  res.json('push token to blacklist success')
})


module.exports = router;
