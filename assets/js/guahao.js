setSidTop()
var url = location.search; //获取url中"?"符后的字串
if (url.indexOf("?") != -1) {

  var str = url.substr(1);
  var strs = str.split("linkData=")[1];
  var html = '<a href="javaScript:;">http://'+ strs + '</a>'
  document.getElementById("linkData").innerHTML=html; 
  $.ajax({
		url:"http://"+strs,
		type:"get",
		dataType:"json",
		success:function(result){
			console.log(result)
				if(result.success == true){
          var result = result.msg 
          document.getElementById("result").innerHTML=result; 
				}
		}
})
  }