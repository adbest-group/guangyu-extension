// container:容器 action：url type:1-下拉刷新 2-底部加载
    function addItems(container, action, type) {
    	// 设置flag 正在加载
    	loading = true;

    	console.log("正在加载...");

    	$.ajax({
    		type : "post",
    		url : action,
    		dataType : "text",// 返回json格式的数据
    		timeout : 15000,
    		success : function(html, textStatus, XMLHttpRequest) {
    			if (type == 1) {
    				$('.infinite-scroll-preloader').show();
    				// 滑动到底部事件初始化
    				$.detachInfiniteScroll($('.infinite-scroll'));// 去除绑定事件
    				$.attachInfiniteScroll($('.infinite-scroll'));// 添加绑定事件

    				$(container).html(html);
    				$.pullToRefreshDone('.pull-to-refresh-content');
    			} else {
    				$(container).append(html);
    			}
    			loading = false;
    		},
    		error : function(XMLHttpRequest, textStatus, errorThrown) {
    			$.detachInfiniteScroll($('.infinite-scroll'));
    			$('.infinite-scroll-preloader').remove();
    			$.toast('系统发生错误,请稍后再试');
    			loading = false;
    		}
    	});
    }

    function lastPage() {
    	console.log("lastPage...");
    	$.detachInfiniteScroll($('.infinite-scroll'));
    	// $('.infinite-scroll-preloader').remove();
    	$('.infinite-scroll-preloader').hide();
    }
