function isMobile() {
	if (/ipad|ipod|iphone|android/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
}

if (!isMobile()) {
	//var a=document.getElementsByName("body")[0].width;
	if(document.body.offsetWidth<400){
		$(".page").css("width:"+document.body.offsetWidth);
	}else{
		$(".page").addClass("pc-content");
	}
}