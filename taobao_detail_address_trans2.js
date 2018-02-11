
 var $j = jQuery.noConflict(); 
 detail_init2();
 function detail_init2(){
  if(window.location.href.indexOf("ali_trackid=2")>0){//重定向之后
    var fanli_get_statues_port;
    if(chrome.extension.connect){
      fanli_get_statues_port = chrome.extension.connect({name: "fanli_get_statues"});
    }else{
      fanli_get_statues_port = chrome.runtime.connect({name: "fanli_get_statues"});
    }
    fanli_get_statues_port.onMessage.addListener(function(data) {
      console.log('taobao_detail2接收到的消息是:',data)
      var commission = data.rebate.ret.result.commissions
      inser_info2(commission)
    });
    //获取返利是否开启命令
    var id = getParam('id')
    var ids = []
    ids.push(id)
    fanli_get_statues_port.postMessage({type:2,ids:ids});
  }
}
function getParam(paramName) { 
  paramValue = "", isFound = !1; 
  if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
      arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
  } 
  return paramValue == "" && (paramValue = null), paramValue 
}
