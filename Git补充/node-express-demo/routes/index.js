var express = require('express');
var router = express.Router();
//模拟数据库
var db = [
	{
		username:'张三',
		password: '123'
	},
	{
		username: '李四',
		password: '123'
	}
]
// 模拟session
var session = [];


/* GET home page. */
router.get('/', function(req, res, next) {
	// res response对象  响应对象
	// res.render 找到 index的模板引擎,并用第二个参数 渲染页面的内容
  res.render('index', { title: 'Express' , ctitle: '不凡学院'});
});
// 拦截 /news请求  找 news.ejs模板引擎渲染 ,用第二个参数替换占位符
router.get('/news', function(req, res, next) {
	
  res.render('news.ejs', {newsTitle:'三月天来',newsContent:'桃花开啊!'});
});
// 拦截 /news请求  找 news.ejs模板引擎渲染 ,用第二个参数替换占位符
router.get('/other', function(req, res, next) {
	
  res.render('about');
});
//跳转到登陆页面
router.get('/login', function(req, res, next) {
	
  res.render('login.ejs');
});
// 接收登陆请求
router.post('/doLogin', function(req, res, next) {
	//默认不存
	var flag = false;
	// console.log(req);
	// get/post发送请求携带参数的方式是不同的,所以后台获取的方式也不同
	// var username = req.query.username;
	// var password = req.query.password;
	var username = req.body.username;
	var password = req.body.password;
	//判断数据库是否有用户名和密码  实际开发中是通过程序 和sql语句来判断数据库是否存在
	// 这里用js模拟
	for(var i = 0 ; i < db.length ; i ++){
		if(db[i].username == username){
			//用户名和密码都相等
			if(db[i].password == password){
				flag = true;
				break;
			}
		}
	}
	//存在 登陆成功
	if(flag){
		//应该重新定向到 succ或者fial
		// res.render('succ.ejs');
		// redirect 重定向  抛弃之前的req对象的内容  防止表单重复提交 并且修改地址栏
		//加入session
		session.push({
			username: username
		})
		res.redirect('/succ');
	}else{
		res.redirect('/fail');
	}


    // res.render('login.ejs');
});
router.get('/succ', function(req, res, next) {
	//用户登陆成功 后访问
	var flag = false;
	// 怎么知道刚才是谁登陆的呢?
  if(session.length>0){
  	// [
  	// 	{
  	// 		key:123,
  	// 		value: 'zhangsa'
  	// 	},
  	// 	{
  	// 		key: 456,
  	// 		value: 'lsi'
  	// 	}
  	// ]
  	flag = true;
  	res.render('succ.ejs',{username:session[0].username});
  }else{
  	//非法访问
  	res.redirect('/login');
  }
  // console.log(req);	
  // res.render('succ.ejs',);
});
router.get('/fail', function(req, res, next) {
	
  res.render('fail.ejs');
});

// 注册请求
router.get('/reg', function(req, res, next) {
	
  res.render('reg.ejs');
});
// 执行注册
router.post('/doReg', function(req, res, next) {
	//假设能被注册
	var flag = true;
	var username = req.body.username;
	var password = req.body.password;
	// 在push之前  是否要考虑是否存在用户名?
	for(var i = 0  ; i < db.length ; i ++){
		if(db[i].username == username){
			//存在用户名 不允许注册
			flag = false;
			break;
		}
	}
	//允许注册
	if(flag){
		// 添加到数据库
		db.push({
			username:username,
			password:password
		})
		//跳转到登陆页面
		res.redirect('/login');
	}else{
		//把表单数据情况 重新定向到 注册页面
		res.redirect('/reg');
	}

  // res.render('reg.ejs');
});
//登出页面
router.get('/doLogout', function(req, res, next) {
	
	//清空session
	//注意: 实际开发中 sessoin是由多个对象组成的,一个用户的退出 实际上使删除了该用户对应的session对象
	// 这里简化 清空了所有sesion对象
	session = [];	
  res.redirect('/');
});

//ajax验证用户名是否可用 checkUserName

router.post('/checkUserNameAjax', function(req, res, next) {
	//默认可用
	var flag = true;
	var username = req.body.username;
	for(var i = 0 ; i < db.length ; i ++){
		if(db[i].username == username){
			flag = false;
			break;
		}
	}
	res.send(flag?'succ':'fail');
});

// ajax执行注册
router.post('/doRegAjax', function(req, res, next) {
	//假设能被注册
	var flag = true;
	var username = req.body.username;
	var password = req.body.password;
	// 在push之前  是否要考虑是否存在用户名?
	for(var i = 0  ; i < db.length ; i ++){
		if(db[i].username == username){
			//存在用户名 不允许注册
			flag = false;
			break;
		}
	}
	//允许注册
	if(flag){
		// 添加到数据库
		db.push({
			username:username,
			password:password
		})
	}
	// 模拟网络延迟
	setTimeout(function(){
		res.send(flag?'succ':'fail');
	},2000)
	

});
// 接收登陆请求
router.post('/doLoginAjax', function(req, res, next) {
	//默认不存
	var flag = false;
	var username = req.body.username;
	var password = req.body.password;
	//判断数据库是否有用户名和密码  实际开发中是通过程序 和sql语句来判断数据库是否存在
	// 这里用js模拟
	for(var i = 0 ; i < db.length ; i ++){
		if(db[i].username == username){
			//用户名和密码都相等
			if(db[i].password == password){
				flag = true;
				break;
			}
		}
	}
	//存在 登陆成功
	if(flag){
		//应该重新定向到 succ或者fial
		// res.render('succ.ejs');
		// redirect 重定向  抛弃之前的req对象的内容  防止表单重复提交 并且修改地址栏
		//加入session
		session.push({
			username: username
		})
	}
	setTimeout(function(){
		res.send(flag?'succ':'fail');
	},2000);
});

router.get('/movie', function(req, res, next) {
		
  res.render('movie')
});
router.get('/cors', function(req, res, next) {
		
  res.render('cors')
});
router.get('/movie2', function(req, res, next) {
		
  res.render('movie2')
});
module.exports = router;
