// {
// 	url:'xxx',
// 	type:'GET',
// 	data:{
// 		username:'zhagns',
// 		age:20
// 	}
// }

function  myAjax(options,fn) {
	//发送ajax请求
  //  创建一个实例对象
  var xhr = new XMLHttpRequest();
  //获取方法 get/post  变为小写
  var type =  options.type.toLowerCase();
  var url = options.url;
  var params = '';
	if(options.data){
		for(var key in options.data){
			params += '&'+key+'='+options.data[key];
		}
		// &username=zhangsan&password=1234
		params = params.substr(1);
	}
  // 2. 设置请求方式 以及请求的url   abc?usernmae=asdf&paw=asdf
  if(type=='post'){
  	xhr.open(type,url);
  	 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  	// 3. 执行发送 ...  username=zhangsan&password=1234
  	if(params){
  		xhr.send(params);
  	}
  }else{
  	if(params){
  		url += '?'+params;
  	}
  	xhr.open(type,url);
  	xhr.send(null);
  }
  // 4. 监听状态 
  xhr.onreadystatechange = function(){
      // xhr.readyState 发送成功 等待结果
      // xhr.status == 200  请求成功 返回结果
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 5. 获取结果
           console.log(xhr.responseText);
           // $('.msg').text(xhr.responseText);
           // 字符串
           var rs = xhr.responseText;
           fn(rs);	
       }
  }
}