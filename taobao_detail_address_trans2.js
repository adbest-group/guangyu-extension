
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
      inser_info2('10.3')
    });
    //获取返利是否开启命令
    var id = window.location.href.split('?')[1].split('=')[1].split('&')[0]
    var ids = []
    ids.push(id)
    fanli_get_statues_port.postMessage({type:2,ids:ids});
  }
}
