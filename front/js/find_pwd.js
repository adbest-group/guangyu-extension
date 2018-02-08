       

		var lrkj_service_ip = localStorage["lrkj_serverIp"];
		function goBack() {
			location.href = "login.html";
		}

		function submitreg() {

			var pwd = $("input[name='pwd']").val();
			var rep = $("input[name='repwd']").val();
			var phone = $("input[name='phone']").val();
			var code = $("input[name='code']").val();

			if (phone == '') {
				$.toast("手机号码不能为空");
				return;
			}
			if (code == '') {
				$.toast("验证码不能为空");
				return;
			}

			if (phone.length != 11) {
				$.toast("手机号码不合法");
				return;
			}

			if (pwd != rep) {
				$.toast("密码不一致");
				return;
			}

			$.showPreloader();

			$.ajax({
				type : "post",
				url : lrkj_service_ip + "front/findPwdAction.jhtml",
				dataType : "json",// 返回json格式的数据
				timeout : 15000,
				data : $("#formData").serialize(),
				success : function(json, textStatus, XMLHttpRequest) {
					$.hidePreloader();
					if (json.code == 0) {
						$.toast("重置成功");
						setTimeout(function(){
							location.href = "login.html";
						},800);
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
				submitreg();
			}
		});
		
		
		
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
			 
			 var codeimage = $("input[name='codeimage']").val();
			 if (codeimage.length !=4 ) {
				$.toast("验证码输入错误");
				return;
			 }
			 
			 var scene=2;
		
		     $.ajax({
				type : "post",
				url : lrkj_service_ip + "api/newsendCode.jhtml",
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
		
		
		$("#goBack").click(goBack);
		
		$("#send_btn").click(send);
		
		$("#submitreg").click(submitreg);
		
		$(".codeimage").attr("src",lrkj_service_ip+"api/codeImage");
		$(".codeimage").click(function(){
			 //var s=+new Date();
			 this.src=this.src+'?'+Math.random();
		});
		