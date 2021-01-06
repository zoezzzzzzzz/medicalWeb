setSidTop()
var globalSID = ''
var url = location.search; //获取url中"?"符后的字串
var dept = ''
if (url.indexOf("?") != -1) {

var str = url.substr(1);
var strs = str.split("&");
dept = decodeURI(strs[0].split("=")[1])
// for(var i = 0; i < strs.length; i ++) {
// // theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
// 	console.log('unescape(strs[i].split("=")[1])',decodeURI(strs[i].split("=")[1]))
// }
}
var data = {"dept":dept}
console.log('dept',dept)
$.ajax({
url:"http://39.108.63.4:8080/reservation/queryDocsFromDepts",
type:"get",
data:data,
dataType:"json",
success:function(result){
		if(result.success == true){
			var doctors = result.data
			var html = ''
			for (var i = 0; i < doctors.length; i++)
			{
				var sid = parseInt(doctors[i].sID.substr(1))
				html += '<div class="col-lg-4">'+'<div class="card">'+'<div class="card-body">'+'<div class="media align-items-center">'+
								'<div class="media-body ml-3">'+'<div>'+
									'<h5 class="mb-0">'+ doctors[i].sName+'</h5>'+'</div>'+'<div>职称：'+ doctors[i].sPosition +'</div>'+ '<p> 费用：'+ doctors[i].sFee +'</p>'+
									'<button type="button" onclick="selectD('+sid+')" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">挂号</button>'+
									'</div>'+'</div>'+'</div>'+'</div>'+'</div>'
			}
			
			document.getElementById("doctors").innerHTML=html; 
			
		}
}
})

function selectD(sid){
  var len = sid.toString().length;
  while(len < 5) {
      sid = "0" + sid;
      len++;
  }
	sid = "D" + sid;
	globalSID = sid
  console.log(sid)
}

// function submitForm(){
// 	var pid = document.getElementById("inputPID").value
// 	var rid = document.getElementById("inputRID").value
// 	var radio0 = document.getElementsByName("options")[0].checked;
// 	console.log(radio0)
// 	var InputData = {"isReserved":radio0,"pid":pid,"resvid":rid,"sid":globalSID}
// 	console.log('InputData',InputData)
// 	// 300000000000000000
// 	$.ajax({
// 		url:"http://39.108.63.4:8080/finance/getPaymentLink",
// 		type:"post",
// 		data:InputData,
// 		dataType:"json",
// 		success:function(result){
// 			console.log(result)

// 				if(result.success == true){
// 					var link = result.data
// 					console.log('link',link)
// 					// if()
// 					window.location.href = link	
// 				}
// 		}
// })
// }

function submitForm1(){
	var pid = document.getElementById("inputPID1").value
	var rid = document.getElementById("inputRID1").value
	var InputData = {"isReserved":true,"pid":pid,"resvid":rid,"sid":globalSID}
	console.log('InputData',InputData)
	$.ajax({
		url:"http://39.108.63.4:8080/finance/getPaymentLink",
		type:"post",
		data:InputData,
		dataType:"json",
		success:function(result){
			console.log(result)
				if(result.success == true){
					var linkData = result.data
					console.log('link',link)
					var link ="guahao.html" + '?linkData='+linkData
					window.location.href = link	
				}
		}
})
  
}

function submitForm2(){
	var flag = true
	var pid = document.getElementById("inputPID2").value
	var page = parseInt(document.getElementById("inputAGE").value) 
	var inputNAME = document.getElementById("inputNAME").value
	var inputGENDER = document.getElementById("inputGENDER").value
	var inputNA = document.getElementById("inputNA").value
	var inputPHONE = document.getElementById("inputPHONE").value
	var radio0 = document.getElementsByName("options")[0].checked;
	var InputData = {"page":page,"pgender":inputGENDER,"phone":inputPHONE,"pid":pid,"pmar":radio0,"pna":inputNA,"pname":inputNAME}
	if(!(inputGENDER=='M' || inputGENDER=='F')){
		var input_error = "性别输入错误"
		document.getElementById("input_error").innerHTML=input_error; 
		flag = false
	}
	if (pid.length > 18) {
		var input_error = "身份证号码不超过18位"
		document.getElementById("input_error").innerHTML=input_error; 
		flag = false
	}
	if (inputPHONE.length > 11) {
		var input_error = "手机号码不超过11位"
		document.getElementById("input_error").innerHTML=input_error; 
		flag = false
	}
	console.log("flag",flag)
	console.log('InputData',InputData)
	if(flag){
		$.ajax({
			url:"http://39.108.63.4:8080/reservation/submitNewPatient",
			type:"post",
			data:InputData,
			dataType:"json",
			async: false,
			success:function(result){
				console.log(result)
					if(result.success == true){
						var Data ={"isReserved":false,"pid":pid,"resvid":"","sid":globalSID}
						console.log('data',Data)
						$.ajax({
							url:"http://39.108.63.4:8080/finance/getPaymentLink",
							type:"post",
							data:Data,
							dataType:"json",
							async: false,
							success:function(result){
								console.log(result)
									if(result.success == true){
										var linkData = result.data
										console.log('link',linkData)
										var link ="guahao.html" + '?linkData='+linkData
										window.location.href = link	
									}
							}
					})
					}
			}
	})
	}

}