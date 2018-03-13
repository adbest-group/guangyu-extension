
    location.href="login.html";//固定，先跳到登陆页面
    var lrkj_service_ip=localStorage["lrkj_serverIp"];
	
    if(typeof localStorage["user_token"] == "undefined") {
        localStorage["user_token"]='';
    }

    function logout(){
        localStorage["user_token"]="";
        location.href="login.html";
    }
	
	function goshop(){
	        var createProperties={
                url:'https://s.taobao.com/search?q=连衣裙&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20161020&ie=utf8'
            }
            chrome.tabs.create(createProperties);
	}
	function goshop2(){
	        var createProperties={
                url:'front/main.html'
            }
            chrome.tabs.create(createProperties);
	}
	
	function goApp(){
	     
		 $.modal({
			 title:  '',
			 color:'#c0c0c0',
			 text: '<div style="padding: 0.3rem;text-align: center"> <img id="appimg" src="" style="width: 11rem;height: 11rem;"> <span style="padding: 0.5rem;;display: block;font-size: 0.7rem;color:#000">扫描二维码下载App</span> </div>',
		 });
		 
		 $("#appimg").attr("src","http://fanli.xmluren.com/front/img/app.png?"+Math.random());
	}
	
	function closeLeft(){
	   $(".modal-overlay").removeClass("modal-overlay-visible");
	   $.closePanel();
	}
	
	function onClose(){
	   $(".modal-overlay").addClass("modal-overlay-visible");
	   $(".modal-overlay-visible").unbind("click");
	   $(".modal-overlay").unbind("click");
	}
	
	function onOpen(){
	   
	   closeLeft();
	   
	}

    function init(){

        var token=localStorage["user_token"];
        if(token==''){
            location.href="login.html";
            return;
        }

		
		
		$("#ddgz").click(function(){
            var createProperties={
                url:lrkj_service_ip+"/front/user_tbkdd_index?token="+token
            }
            chrome.tabs.create(createProperties);
        });

        $("#yetx").click(function(){

            var createProperties={
                url:lrkj_service_ip+"/front/user_tx_index?token="+token
            }
            chrome.tabs.create(createProperties);
        });
		
		$(".flgl").click(function(){

            var createProperties={
                url:lrkj_service_ip+"/front/getArticle?id=1"
            }
            chrome.tabs.create(createProperties);
        });
		
		$(".cjwt").click(function(){

            var createProperties={
                url:lrkj_service_ip+"/front/getArticle?id=2"
            }
            chrome.tabs.create(createProperties);
        });
		
		$(".gyll").click(function(){
            var createProperties={
                url:lrkj_service_ip+"/front/getArticle?id=3"
            }
            chrome.tabs.create(createProperties);
        });
		
		
		$(document).on("click", "#menu_btn", function() {		
      alert('a')    
		   $(".modal-overlay").addClass("modal-overlay-visible");
           $.openPanel("#panel-left-demo");
        });
		
		
		
		
        $.ajax({
            type : "post",
            url : lrkj_service_ip+"front/user_infoAction.jhtml?token="+token,
            dataType : "json",// 返回json格式的数据
            timeout : 15000,
            //data : $("#formdata").serialize(),
            success : function(json, textStatus, XMLHttpRequest) {
                $.hidePreloader();
                if (json.code == 0) {
                    var user=json.data.user;
                    $(".sj").html(user.phone);
                    $(".zhye").html("￥"+user.money);
                    $(".yjsy").html("￥"+user.yjsy);
                    $(".ytxje").html("￥"+user.tx_money);
                    $(".servicePhone").html(json.data.servicePhone);
                    localStorage["user_id"]=user.id;
					localStorage["fanli_did"]=user.did;
					
					$.ajax({
						type : "post",
						url : localStorage["lrkj_serverIp"]+'api/getProportion',
						dataType : "json",// 返回json格式的数据
						data:{uid:localStorage["user_id"]},
						timeout : 15000,
						success : function(json, textStatus,
								XMLHttpRequest) {
							localStorage['lrkj_user_proportion']=json.data.proportion;
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown) {
						}
					});
					
					//alert(localStorage["fanli_did"]);
                    //$(".title").html(json.data.appName);
                }else if(json.code == 3){
                    location.href="login.html";
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
      
	  
	  
	  // $.ajax({
    //         type : "post",
    //         url : lrkj_service_ip+"api/getVersion.jhtml?type="+localStorage["fanli_client"],
    //         dataType : "json",// 返回json格式的数据
    //         timeout : 15000,
    //         //data : $("#formdata").serialize(),
    //         success : function(json, textStatus, XMLHttpRequest) {
    //             if(json.code==0){
				   
		// 		   if(json.data.version.version_num>localStorage["fanli_version"]){
				       
		// 		       var createProperties={
		// 					url:json.data.version.url
		// 			   }
					   
		// 			   if(json.data.version.updating==0){
					       
		// 			       $.confirm('发现最新版本,是否更新?', function () {
							  
		// 				   });
						   
						   
		// 				   $.confirm('发现最新版本,是否更新?', 
		// 						function () {
		// 						   chrome.tabs.create(createProperties);
		// 						},
		// 						function () {
		// 						  $.showPreloader();
    //                               setTimeout(init,300);
		// 						}
		// 				   );
		// 				   return;
						   
						   
		// 			   }else{
		// 			       $.alert('发现新版本,马上去更新',function(){
		// 				      chrome.tabs.create(createProperties);
		// 				   });
		// 			       return;
						   
		// 			   }
					   
					   
								   
		// 			}
				
		// 		    $.showPreloader();
    //                 setTimeout(init,300);
				   
		// 		}else {
    //                 $.toast(json.msg);
    //             }
				
    //         },
    //         error : function(XMLHttpRequest, textStatus, errorThrown) {
                
    //             $.toast("系统发生错误,请稍后再试");
    //         }
    //     });
	
	    
		$("#goshop").click(goshop);
		//$("#goshop2").click(goshop2);
		$("#goApp").click(goApp);
		$("#logout").click(logout);
		$("#menu_btn_2").click(closeLeft);
		$(".modal-overlay").click(closeLeft);
	    $("#llkf").click(function(){	
	        var createProperties={
                url:'http://fanli.xmluren.com//front/getArticle?id=12'
            }
            chrome.tabs.create(createProperties);
		});
        
		