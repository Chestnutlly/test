function  myAjax(url,type,params,fn) {
	//发送ajax请求
  //  创建一个实例对象
  var xhr = new XMLHttpRequest();
  // 2. 设置请求方式 以及请求的url   abc?usernmae=asdf&paw=asdf
  xhr.open(type,url);
  if(type=='post'){
  	 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  	// 3. 执行发送 ...  username=zhangsan&password=1234
 	 xhr.send(params);
  }else{
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