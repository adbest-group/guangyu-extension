    var lrkj_service_ip=localStorage["lrkj_serverIp"];
		function submitlogin() {
			$.showPreloader();
			$.ajax({
				type : "post",
				url : lrkj_service_ip+"front/loginAction.jhtml",
				dataType : "json",// 返回json格式的数据
				timeout : 15000,
				data : $("#formdata").serialize(),
				success : function(json, textStatus, XMLHttpRequest) {
					$.hidePreloader();
					if (json.code == 0) {
						$.toast("登陆成功");
						localStorage["user_token"]=json.data.token;
						//localStorage["fanli_did"]=json.data.did;
		                location.href="user_info.html";
					} else {
						$.toast(json.msg);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.hidePreloader();
					$.toast("系统发生错误,请稍后再试");
				}
			});
		}
		$('.input_enter').bind('keyup', function(event) {
			if (event.keyCode == "13") {
				//回车执行查询
				//$('#search_button').click();
				submitlogin();
			}
		});
    $("#submitlogin").click(submitlogin);
    var timero;
		function timeStart(time) {
		  $("#timer").html(time + "s");
			$("#send").hide();
			$("#timer").show();
			timero = setInterval(function() {
				time--;
				$("#timer").html(time + "s");
				if (time == 0) {
					clearTimeout(timero);
					$("#send").show();
					$("#timer").hide();
				}
			}, 1000); 
		}
		function send(){
		  var phone = $("input[name='phone']").val();
      if (phone == '') {
        $.toast("手机号码不能为空");
        return;
      }
      // var codeimage = $("input[name='codeimage']").val();
      // if (codeimage.length !=4 ) {
      //   $.toast("验证码输入错误");
      //   return;
      // }
      var scene=1;
      $.ajax({
        type : "post",
        //从此处开始修改
        url : baseUrl+api.getProductInfo,
        contentType:"application/json",
        dataType : "json",// 返回json格式的数据
        data : JSON.stringify({
          "user_id":"",
          "product_url" : msg.link
        }),
        timeout : 15000,
        success : function(json) {
          console.log(json)
          port.postMessage({type:1,link:json.ret.result.shortLinkUrl});
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('请求失败')
        }
      });


		  $.ajax({
				type : "post",
				url : lrkj_service_ip + "api/newsendCode.jhtml",
				//url :   "http://127.0.0.1/api/newsendCode.jhtml",
				dataType : "json",// 返回json格式的数据
				data:{phone:phone,scene:scene,codeimage:codeimage},
				timeout : 15000,
				success : function(json, textStatus, XMLHttpRequest) {
					$.hidePreloader();
					if (json.code == 0) {
						$.toast('发送成功');
						timeStart(30);
					} else {
						$.toast(json.msg);
						if(json.code==1000){
						    timeStart(json.data.time);
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.toast("系统发生错误,请稍后再试");
				}
			});
    }
    $("#send_btn").click(send);
		/*
		chrome.browserAction.showHTMLBalloon({
			"path":"../register.html",
			"width":300,
			"height":300
		});
		*/