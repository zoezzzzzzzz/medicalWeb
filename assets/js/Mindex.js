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
  document.cookie ="sid="+sid
  document.cookie ="password="+password
  console.log(document.cookie.split(";"))
  // if (phoneNum.length != 11) {
  //  oError.innerHTML = "手机号必须为11位";
  //  isError = false;
  // }
  
  var data = {"pw":password,"sid":sid}
  $.ajax({
    url:"http://localhost:8080/utils/login",
    type:"post",
    data:data,
    dataType:"json",
    success:function(result){
        if(result.success == true){
          if(sid[0] == 'F'){
            window.location.href='guahao.html';
          }else if(sid[0] == 'D'){
            window.location.href='doctor-selectPatient.html';
          }
        }
        console.log(result.msg)
    }
})
  // window.alert("登录成功")
 }
