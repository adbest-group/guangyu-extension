var api
var baseUrl
$.get('./config.json').done(function(data){
  api = data.api
  baseUrl = data.baseUrl
});
// 格式化日期
// Date:data fmt:时间格式
function getTime(date, fmt) {
	var o = {
		"M+" : date.getMonth() + 1, // 月份
		"d+" : date.getDate(), // 日
		"h+" : date.getHours(), // 小时
		"m+" : date.getMinutes(), // 分
		"s+" : date.getSeconds(), // 秒
		"q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
		"S" : date.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));

	return fmt;
}
function getProductInfo(msg,port){
  console.log(msg.link)
  $.ajax({
    type : "post",
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
}
function getCommission(msg,port,type){
  $.ajax({
    type : "post",
    url : baseUrl+api.getCommission,
    contentType:"application/json",
    dataType : "json",// 返回json格式的数据
    data : JSON.stringify({
      "user_id":"",
      "num_iids" : msg.ids
    }),
    timeout : 15000,
    success : function(data) {
      //拿到对应商品的返利金额并将数据发送给要展示在页面中(详情页、列表页)
      console.log('请求到的数据为：',data)
      port.postMessage({type:type,rebate:data})
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('请求失败')
    }
  });
}
function onConnectPort(port) {
  //背景页接到请求之后的操作
	port.onMessage.addListener(function(msg) {
    console.log(msg)
    if(msg.type === 1){
      console.log('接收到taobao_detail页面的信息',msg)
      getProductInfo(msg,port)
      // port.postMessage({type:1,link:'假数据link'});
    }
    if(msg.type === 2){
      console.log('接收到taobao_detail2页面的信息',msg)
      getCommission(msg,port,msg.type)
      // port.postMessage({type:2,rebate:['10','20']})
    }
    if(msg.type === 3){
      console.log('接收到list页面的信息',msg)
      getCommission(msg,port,msg.type)
      // port.postMessage({type:3,rebate:['10','20','30']})
    }
	});
}

if (chrome.extension.connect) {
	chrome.extension.onConnect.addListener(onConnectPort);
} else {
	chrome.runtime.onConnect.addListener(onConnectPort);
}

/*
 * var createProperties={ url:'front/login.html' }
 * chrome.tabs.create(createProperties);
 */



var filter = {
	urls : [
			"https://log.mmstat.com/*&b2c_orid=*",
			"http://img.alicdn.com/tps/TB1fPJxMpXXXXbSXpXXXXXXXXXX-1440-380.png",
			"http://img.alicdn.com/tps/TB1dNoEJVXXXXXoXFXXXXXXXXXX-149-36.png",
			"http://ooo.fanli.com/promo/item/channel/index.htm?channel=qqhd" ]
};
var opt_extraInfoSpec = [ "blocking" ];


//安装时的操作
if(chrome.runtime.onInstalled){
	chrome.runtime.onInstalled.addListener(function(info){
		// chrome.tabs.create({url:'http://www.baidu.com'});
	});
}else{
	
}


if (window.Notification) {
	// show();
}
function show() {
	var notification = new Notification("hello msg", {
		icon : 'default.png',
		body : 'Time to make the toast.'
	});
	notification.onclick = function() {
		console.log("click");
		notification.close();
	}
}


