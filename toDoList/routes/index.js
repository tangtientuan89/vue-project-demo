var express = require('express');
var router = express.Router();
var path=require('path');
/* GET home page. */

router.get('/home', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../views/home.html'));
});
module.exports = router;

// router.get('/login',function(req,res,next){
//   res.sendFile(path.join(__dirname,'../views/login.html'))
// })
// router.get('/',function(req,res,next){
//   var 
// })