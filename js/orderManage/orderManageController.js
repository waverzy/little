define(["main", "orderManage/orderManageView"], function(app,thisview) {
    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [{
        element:'#mask',
        event:'click',
        handler:close_mask
    },{
        element:'.item_list',
        event:'scroll',
        handler:page_scroll
    }];

    /**
     * 初始化
     */
    function init() {
        var orders_scrolltop = localStorage.getItem('orders_scrolltop');
        var limit = 10;
        if(orders_scrolltop == null || orders_scrolltop == '' || $('.is_li').height() == null || $('.is_li').height() == 0){
            limit = 10;
        } else {
            limit = (Math.ceil(orders_scrolltop/$('.is_li').height()))+8;
        }
        limit = limit<10 ? 10 : limit;
        var user_id = localStorage.getItem('user_id');

        //注册要跳回的时候使用的缓存
        localStorage.setItem(REGISTER_REFERER, 'orderManage');
        app.jquery.ajax({
            type:'post',
            url:'/orderManage',
            cache:false,
            data: {index: 0, limit: limit, user_id: user_id},
            success:function(output){
                if(output.msg == 'success')
                {
                    item_list(output);
                    thisview.render({
                        bindings: bindings
                    });
                    $("#status").fadeOut(SPEED_FADEOUT);
                    $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
                    app.jquery('.page-content').scrollTop(orders_scrolltop);
                    $('.panel_1').hide();
                }
            }
        });
    }

    function item_link(cur_link) {
        localStorage.setItem('orders_scolltop', $$('.page-content').scrollTop());
        location.href = cur_link;
    }

    function item_list(output) {
        var commentCount = output.data.maxCount || 0;
        $('#commentCount').val(commentCount);
        var char = '';

        var item = output.data.orders || [];
        if(item.length > 0){
            $.each(item, function(k, v) {
                char += '<li class="is_li"><div class="card"><div class="card-header"><div><a onclick="item_link(\'activityDetail?activityId=' + v['activityId'] + '\')\" class=\"item-link external\">' + v['activityTitle'] + '</a></div><div>' + switchTimeFormat(v['activityTime']) + '</div></div><div class="card-content">' +
                    '<div class="card-content-inner"><div>姓名：' + v['name'] + '</div><div>性别：' + v['sex'] + '</div><div>年龄' + v['age'] + '岁</div><div>联系方式：' + v['mobile'] + '</div></div>' +
                    '<div class="card-footer">下单时间：' + add8Hours(v['orderTime']) + '</div></div></div></li>';
                //char += '<li class="is_li">' +
                //    '<div class="item-content"><div class="item-media">';
                //char += '<img class="lazy" data-original=' + v['activityPic'] +' onerror="onerror=null;src=\'http://o6zo3xy1k.bkt.clouddn.com/favicon.png\''+img_ios320+'">';
                //
                //char +=
                //    '</div>' +
                //    '</a>' + '<div class="item-inner"><div class="item-title-row"><div class="item-title">' + v['activityTitle'] + '</div>' +
                //    '</div><div class="item-subtitle">' + v['activityTime'] + '</div>'+
                //    '<div class="p-i-infos"><div class="fore1" style="width:100%"><div class="num">' + v['name'] + '/' + v['sex'] + '/' + v['age'] + '岁/' + v['mobile'] + '</div><div class="p-num">下单时间' + v['orderTime'] + '</div></div></div></div></div></li>';
            });
            //清空原先的条目
            $$('ul.item_list li').remove();
            $$('.temporary-none').remove();
            // 添加新条目
            $$('.item_list').append(char);

            $$("img.lazy").lazyload({

                threshold : 200,
                placeholder : "http://o6zo3xy1k.bkt.clouddn.com/lazyload2.png",
                container: $$(".page-content")
            });

            $$('.load-more').text('加载更多');
            if(item.length < 10){
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                // 删除加载提示符

                return;
            }
        }else{
            //清空原先的条目
            $$('ul.item_list li').remove();
            $$('.temporary-none').remove();
            char += '<div class="temporary-none" >暂无相关数据</div>';
            $$('.item_list').append(char);
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll($$('.infinite-scroll'));
            // 删除加载提示符
            return;
        }
    }

    //点击遮罩关闭分类
    function close_mask(){
        $(this).hide();
    }

    //页面滚动
    function page_scroll(){

    }

    /**
     * 进行筛选操作的时候，检查是否有关键字搜索
     * @param name
     * @returns {*}
     */
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(decodeURI(r[2]));
        return null; //返回参数值
    }

    function compute_leftTime(time) {
        var deadline = new Date(time);
        var currentTime = new Date();
        var leftTime = deadline.getTime() - currentTime.getTime();
        var leftDays = Math.floor(leftTime/(24*3600*1000));
        if(leftDays == 0) {
            var leftHours = Math.floor(leftTime/(3600*1000));
            if(leftHours == 0) {
                var leftMinutes = Math.floor(leftTime/(60*1000));
                if(leftMinutes == 0) {
                    var leftSeconds = Math.floor(leftTime/1000);
                    if(leftSeconds == 0) {
                        return "已截止";
                    }
                    return leftMinutes + "秒";
                }
                return leftMinutes + "分钟";
            }
            return leftHours + "小时";
        } else if(leftDays > 0) {
            return leftDays + "天";
        } else {
            return "已截止";
        }
    }

    function switchTimeFormat(timeStr) {
        var currentTime =  new Date(timeStr);
        return currentTime.toLocaleString().replace(/:\d{1,2}$/,' ');
    }

    function add8Hours(ctime) {
        var currentTime = new Date(ctime).getTime();
        return new Date(parseInt(currentTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
    }

    return {
        init: init
    };

});