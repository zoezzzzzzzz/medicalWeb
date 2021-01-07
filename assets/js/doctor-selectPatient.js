setSidTop()
var globalPresentPatient = ''
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
		async: false,
    data:data,
    dataType:"json",
    success:function(result){
        if(result.success == true){
          if(result.msg !="$DOC HAS NO WAITING PATIENT"){
            globalPresentPatient = result.data.pID
            console.log("globalPresentPatient",globalPresentPatient)
            var idata={'nid':globalPresentPatient}
            $.ajax({
              url:"http://39.108.63.4:8080/reservation/pullPatientInfo",
              type:"post",
              async: false,
              data:idata,
              dataType:"json",
              success:function(result){
                  if(result.success == true){
                    var info = result.data
                    var presentP = "当前病人：" + info.pName
                    document.getElementById("presentP").innerHTML=presentP; 
                    var html = ''
                    html +=  '<div style="padding-bottom: 10px;">姓名：'+ info.pName+'</div>'+
                              '<div style="padding-bottom: 10px;">年龄：'+ info.pAge+'</div>'+
                              '<div style="padding-bottom: 10px;">性别：'+ info.pGender+'</div>'+
                              '<div style="padding-bottom: 10px;">民族：'+ info.pNationality+'</div>'
                    document.getElementById("patientInfo").innerHTML=html; 
                  }
                  console.log('re',result)
              }
          })
          }
        }else{
          var error_msg = "您当前没有挂号的病人"
          document.getElementById("error_msg").innerHTML=error_msg; 
        }
        console.log(result)
    }
})
}

function curePatient(){
  var data = {'pid':globalPresentPatient}
  $.ajax({
		url:"http://39.108.63.4:8080/reservation/queryClinicHistory",
		type:"post",
		data:data,
		dataType:"json",
		success:function(result){
			console.log(result)
				if(result.success == true){
					var cids = result.data
          console.log('cids',cids)
          for(var i = 0; i < cids.length; i++){
            console.log(cids[i].curr_State)
            if(cids[i].curr_State == "ON_PAR"){
              var sid = getCookie("sid")
              var link ="component-modals.html" + '?cid='+cids[i].cid + '&sid=' + sid + '&pid=' + globalPresentPatient
              console.log("link",link)
              window.location.href = link	
            }
          }
				}
		}
})
}