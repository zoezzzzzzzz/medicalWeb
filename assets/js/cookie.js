function getCookie(objName)//获取指定名称的cookie的值
{    
  var arrStr = document.cookie.split(";");
  for(var i = 0;i < arrStr.length;i++)
      {
          var temp = arrStr[i].split("=");
          if(objName.trim()==temp[0].trim()) //此处如果没有去掉字符串空格就不行,偶在这里折腾了半死,主要是这种错误不好跟踪啊
          {                
          return temp[1];
          }                            
      }
}			

function setSidTop(){
  var sid = getCookie("sid")
  var html = ''
  html += '<p class="user-name mb-0">'+sid+'</p>'
  document.getElementById("sidTop").innerHTML=html; 
}
