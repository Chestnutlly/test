var express = require('express');
var router = express.Router();

/* GET users listing. */
 // http://localhost:3000/ajaxTest/
router.get('/', function(req, res, next) {
  res.render('ajaxTest');
});
// http://localhost:3000/ajaxTest/test1
router.get('/test1', function(req, res, next) {
  // res.render('ajaxTest');
  //res.send 返回客户端一个字符串
  var user = {
  	username: '张三',
  	age: 20
  }
  res.send(user);
});
/**
* 测试ajaxpost    http://localhost:3000/ajaxTest/test2
**/
router.post('/test2', function(req, res, next) {
  // console.log(req);
  var username = req.body.username;
  var age = req.body.age;
  var rs = {
  		code:'succ',
  		data:{
  			username:username,
  			age:age
  		}
  	}
  res.send(rs);
});

module.exports = router;
