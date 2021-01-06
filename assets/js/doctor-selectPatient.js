
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

function Next() {
  var sid = getCookie("sid")
  console.log('sid',sid)
  var data = {"sid":sid}
  $.ajax({
    url:"http://39.108.63.4:8080/register/callForNext",
    type:"get",
    data:data,
    dataType:"json",
    success:function(result){
        // if(result.success == true){
        //   if(sid[0] == 'F'){
        //     window.location.href='guahao.html';
        //   }else if(sid[0] == 'D'){
        //     window.location.href='doctor-selectPatient.html';
        //   }
        // }
        // oError.innerHTML = result.msg;
        console.log(result)
    }
})
}

