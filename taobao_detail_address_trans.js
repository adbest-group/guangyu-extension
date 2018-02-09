var $j = jQuery.noConflict(); 
detail_init();
function detail_init(){
  if(window.location.href.indexOf("ali_trackid=2")>0){//重定向之后
    
  }else{//重定向之前
    var taobao_get_link_port;	
    if(chrome.extension.connect){
      //建立持久链接并获取端口
      taobao_get_link_port = chrome.extension.connect({name: "taobao_get_link"});	
    }else{
      taobao_get_link_port = chrome.runtime.connect({name: "taobao_get_link"});	
    }
    taobao_get_link_port.onMessage.addListener(function(data) {
      if(data.type === 1){
        console.log('获取到background.js的信息:',data)
        //做跳转重定向
        window.location.href = data.link
      }
    })
    //获取返利链接命令
    taobao_get_link_port.postMessage({type:1,link:window.location.href});
  }
}
 
function inser_info(info){
	var s='<div class="shop_info_style"><label style="font-size:20px">'+info+'</label></div>';   
	
	//document.body.append(str);
	$j('body').append(s);
}

function inser_info2(info){
	var s='<div class="shop_info_style"><img width="50" height="50" src="http://www.xmluren.com/fanli/img/rebate.png"><label style="font-size:20px">&nbsp;&nbsp;￥</label><label style="font-size:24px">'+info+'</label></div>';   
	 $j('body').append(s); 
}

function inser_info3(info){
	var s='<div class="shop_info_style" style="top:450px;"><img width="50" height="50" src="http://www.xmluren.com/fanli/img/rebate.png"><label style="font-size:20px">&nbsp;&nbsp;￥</label><label style="font-size:24px">'+info+'</label></div>';   
	 $j('body').append(s); 
	 var ss='<div class="shop_info_style" style="height:200px;;top:250px;background:url(http://www.xmluren.com/fanli/img/tip.png) no-repeat;background-size: 100% 100%;">';
	 $j('body').append(ss);
}

function add_info(info){
	$j('#shop_info_style').append(""+info);
}

//Date:data     fmt:时间格式    
function getTime(date,fmt){
  var o = {   
      "M+" : date.getMonth()+1,                 //月份   
      "d+" : date.getDate(),                    //日   
      "h+" : date.getHours(),                   //小时   
      "m+" : date.getMinutes(),                 //分   
      "s+" : date.getSeconds(),                 //秒   
      "q+" : Math.floor((date.getMonth()+3)/3), //季度   
      "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}