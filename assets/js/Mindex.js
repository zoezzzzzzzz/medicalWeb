// $(function () {

//   var phoneNum=document.getElementById("phoneNum").value
//   var password=document.getElementById("password").value
	
// 	$(".login").on("click", function () {
//     console.log("phoneNum: "+phoneNum+" "+"password: "+password);	
	
// 	});
	
	
	
// });
function Login() {
  var sid=document.getElementById("sid").value
  var password=document.getElementById("password").value
  var oError = document.getElementById("error_box")
  console.log(sid)
  // if (phoneNum.length != 11) {
  //  oError.innerHTML = "手机号必须为11位";
  //  isError = false;
  // }
  
  var data = {"pw":password,"sid":sid}
  $.ajax({
    url:"http://39.108.63.4:8080/utils/login",
    type:"post",
    data:data,
    dataType:"json",
    success:function(result){
        if(result.success == true){
          document.cookie ="sid="+sid
          document.cookie ="password="+password
          console.log("cookie",document.cookie.split(";"))
          if(sid[0] == 'F'){
            window.location.href='keshi.html';
          }else if(sid[0] == 'D'){
            window.location.href='doctor-selectPatient.html';
          }else if(sid[0] == 'E'){
            var link = 'component-buttons.html' + '?sid='+sid
            window.location.href=link;
          }
        }
        console.log(result)
    }
})
  // window.alert("登录成功")
 }
