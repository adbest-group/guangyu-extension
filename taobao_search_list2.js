var $j = jQuery.noConflict(); 
// var lrkj_proportion=0.5;

//和back通信的桥梁
var fanli_get_statues_port;	
if(chrome.extension.connect){
	fanli_get_statues_port = chrome.extension.connect({name: "fanli_get_statues"});	
}else{
	fanli_get_statues_port = chrome.runtime.connect({name: "fanli_get_statues"});	
}

fanli_get_statues_port.onMessage.addListener(function(data) {
  console.log('列表页接到的信息是：',data.rebate)
  var nums = data.rebate.ret.result.commissions.split(',')
  setNum(nums)
});
function setNum(nums){
  var s=$j("#mainsrp-itemlist .J_MouserOnverReq.item");
  for(var i=0;i<s.length;i++){
    var t_item=s[i];
    number=parseFloat(nums[i]);
    number = ~~(number * 100) / 100;
    if(number==0){
      number='无返利';
    }else{
      number='返￥'+number
    }
    $j(t_item).find(".icons").append('<li style="color:#f40;font-size:13px;float:right;">'+number+'</li>');					
  }
  // $j(s[0]).attr("fees",true);
}
function getIds(){
  var s=$j("#mainsrp-itemlist .J_MouserOnverReq.item");
  var ids="";
  for(var i=0;i<s.length;i++){
      var t_item=s[i];			 
      ids=ids+$j(t_item).find(".pic-link").attr("data-nid")+",";
  }
  return ids;
}
setTimeout(function(){
  var ids = getIds()
  fanli_get_statues_port.postMessage({type:3,ids:ids});
},2000)

