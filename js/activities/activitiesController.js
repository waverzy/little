define(["main", "activities/activitiesView"], function(app,thisview) {
    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [{
        element:'.panel_1 ul.age_category li',
        event:'click',
        handler:age_submit
    },{
        element:'.panel_1 ul.type_category li',
        event:'click',
        handler:type_submit
    },{
        element:'.panel_1 ul.ability_category li',
        event:'click',
        handler:ability_submit
    },{
        element:'.panel_1 ul.sort_category li',
        event:'click',
        handler:sort_submit
    },{
        element:'.buttons-row .tab-link',
        event:'click',
        handler:tab_switch
    },{
        element:'#mask',
        event:'click',
        handler:close_mask
    },{
        element:'.item_list',
        event:'scroll',
        handler:page_scroll
    },{
        element:'.icon_find_close',
        event:'click',
        handler:icon_find_close
    },{
        element:'.find_search_class',
        event:'click',
        handler:find_search_class
    },{
        element:'.find-search-box',
        event:'click',
        handler:find_search_box
    }];

    function find_search_class(){
        location.href='hotSearch.html';
    }

    function find_search_box(){
        location.href='hotSearch.html';
    }

    /**
     * 删除搜索
     */
    function icon_find_close(){
        var abilityLi = $('.ability_category').children(".checked");
        var abilityVal = $(abilityLi).find('input[name=ability]').val();

        var typeLi = $('.type_category').children(".checked");
        var typeVal = $(typeLi).find('input[name=type]').val();

        var sortLi = $('.sort_category').children(".checked");
        var sortVal = $(sortLi).find('input[name=sort]').val();

        var ageLi = $('.age_category').children(".checked");
        var beginAgeVal = $(ageLi).find('input[name=beginAge]').val();
        var endAgeVal = $(ageLi).find('input[name=endAge]').val();

        var params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
        app.jquery.ajax({
            type:'post',
            url:'/activities' ,
            cache:false,
            data:params,
            success:function(result)
            {
                if(result.msg == 'success')
                {
                    item_list(result);
                    thisview.render({
                        bindings: bindings
                    });
                    $('.icon_find_close').css('display','none');
                    $('#cur_search_id').val('');
                    $('.catch').show();
                    $('#find-searches').html('搜索');
                    $("#find-searches").css('background-color','#fff');
                    app.jquery(".page-content").scrollTop(0);
                }
            }
        });
    }

    /**
     * 初始化
     */
    function init() {
        var referrer = document.referrer;
        var activities_scolltop = localStorage.getItem('activities_scolltop');
        if(activities_scolltop == null || activities_scolltop == ''){
            activities_scolltop = 0;
        }
        var mobile = localStorage.getItem('mobile');
        var keywordVal = getUrlParam('keyword'); //从搜索页进入列表页面
        var show_word = false;
        if(keywordVal != '' && keywordVal!=null){
            show_word = true;
        }

        var params  = localStorage.getItem('varity_params');
        if(params=='' || params==null) {
            var abilityLi = $('.ability_category').children(".checked");
            var abilityVal = $(abilityLi).find('input[name=ability]').val();

            var typeLi = $('.type_category').children(".checked");
            var typeVal = $(typeLi).find('input[name=type]').val();

            var sortLi = $('.sort_category').children(".checked");
            var sortVal = $(sortLi).find('input[name=sort]').val();

            var ageLi = $('.age_category').children(".checked");
            var beginAgeVal = $(ageLi).find('input[name=beginAge]').val();
            var endAgeVal = $(ageLi).find('input[name=endAge]').val();

            if(show_word) {
                params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal, keyword: keywordVal};
            } else {
                params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
            }
        } else {
            params = app.jquery.parseJSON(params);
            if(show_word) {
                params.keyword = keywordVal;
            } else {
                delete params.keyword;
            }
        }

        var limit = (Math.ceil(activities_scolltop/$('.is_li').height()))+8;

        if(limit <= 10){
            limit = 10;
        }

        localStorage.setItem('varity_params',JSON.stringify(params));

        //注册要跳回的时候使用的缓存
        localStorage.setItem(REGISTER_REFERER,'activities');
        app.jquery.ajax({
            type:'post',
            url:'/activities',
            cache:false,
            data:params,
            success:function(output){
                if(output.msg == 'success')
                {
                    item_list(output);
                    thisview.render({
                        bindings: bindings
                    });
                    localStorage.setItem('is_scoll',0);
                    if(show_word){
                        $('#find-searches').html(keywordVal);
                        $("#find-searches").css('background-color','#57524d');
                        $('#cur_search_id').val(keywordVal);
                        $('.icon_find_close').css('display','block');
                        $('.catch').hide();

                    }else{
                        $('.catch').show();
                        $('.icon_find_close').css('display','none');
                        $('#cur_search_id').val('');
                        $('#find-searches').html('搜索');
                        $("#find-searches").css('background-color','#fff');
                    }
                    $("#status").fadeOut(SPEED_FADEOUT);
                    $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
                    app.jquery('.page-content').scrollTop(activities_scolltop);
                    $('.panel_1').hide();
                }
            }
        });
    }

    function age_submit() {
        $(".tab-link").eq(0).text($(this).find('a').text());
        $('#tab1').css('display', 'none');
        $(".tab-link").find(".icon").removeClass("icon_up").addClass("icon_down");
        $("#mask").hide();
        $('.panel_1').hide();

        $(this).addClass("checked");
        $(this).siblings().removeClass("checked");

        var abilityLi = $('.ability_category').children(".checked");
        var abilityVal = $(abilityLi).find('input[name=ability]').val();

        var typeLi = $('.type_category').children(".checked");
        var typeVal = $(typeLi).find('input[name=type]').val();

        var sortLi = $('.sort_category').children(".checked");
        var sortVal = $(sortLi).find('input[name=sort]').val();

        var beginAgeVal = $(this).find('input[name=beginAge]').val();
        var endAgeVal = $(this).find('input[name=endAge]').val();

        var keywordVal = $('#cur_search_id').val();
        var params = {};
        if(keywordVal != '' && keywordVal!=null){
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal, keyword: keywordVal};
        }else{
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
        }
        console.log(params);
        localStorage.setItem('varity_params',JSON.stringify(params));
        app.jquery.ajax({
            type:'post',
            url:'/activities' ,
            cache:false,
            data:params,
            success:function(result)
            {
                if(result.msg == 'success')
                {
                    item_list(result);
                    thisview.render({
                        bindings: bindings
                    });
                    if($('#cur_search_id').val()!='' && $('#cur_search_id').val()!=null){
                        $('.catch').hide();
                        $('#find-searches').html(keywordVal);
                        $("#find-searches").css('background-color','#57524d');
                        $('#cur_search_id').val(keywordVal);
                        $('.icon_find_close').css('display','block');
                    }else{
                        $('.icon_find_close').css('display','none');
                        $('#cur_search_id').val('');
                        $('.catch').show();
                        $('#find-searches').html('搜索');
                        $("#find-searches").css('background-color','#fff');
                    }
                    app.jquery(".page-content").scrollTop(0);
                }
            }
        });
    }

    function type_submit() {
        $(".tab-link").eq(1).text($(this).find('a').text());
        $('#tab2').css('display', 'none');
        $(".tab-link").find(".icon").removeClass("icon_up").addClass("icon_down");
        $("#mask").hide();
        $('.panel_1').hide();

        $(this).addClass("checked");
        $(this).siblings().removeClass("checked");

        var abilityLi = $('.ability_category').children(".checked");
        var abilityVal = $(abilityLi).find('input[name=ability]').val();

        var typeVal = $(this).find('input[name=type]').val();

        var sortLi = $('.sort_category').children(".checked");
        var sortVal = $(sortLi).find('input[name=sort]').val();

        var ageLi = $('.age_category').children(".checked");
        var beginAgeVal = $(ageLi).find('input[name=beginAge]').val();
        var endAgeVal = $(ageLi).find('input[name=endAge]').val();

        var keywordVal = $('#cur_search_id').val();
        var params = {};
        if(keywordVal != '' && keywordVal!=null){
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal, keyword: keywordVal};
        }else{
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
        }
        console.log(params);
        localStorage.setItem('varity_params',JSON.stringify(params));
        app.jquery.ajax({
            type:'post',
            url:'/activities' ,
            cache:false,
            data:params,
            success:function(result)
            {
                if(result.msg == 'success')
                {
                    item_list(result);
                    thisview.render({
                        bindings: bindings
                    });
                    if($('#cur_search_id').val()!='' && $('#cur_search_id').val()!=null){
                        $('.catch').hide();
                        $('#find-searches').html(keywordVal);
                        $("#find-searches").css('background-color','#57524d');
                        $('#cur_search_id').val(keywordVal);
                        $('.icon_find_close').css('display','block');
                    }else{
                        $('.icon_find_close').css('display','none');
                        $('#cur_search_id').val('');
                        $('.catch').show();
                        $('#find-searches').html('搜索');
                        $("#find-searches").css('background-color','#fff');
                    }
                    app.jquery(".page-content").scrollTop(0);
                }
            }
        });
    }

    function ability_submit() {
        $(".tab-link").eq(3).text($(this).find('a').text());
        $('#tab4').css('display', 'none');
        $(".tab-link").find(".icon").removeClass("icon_up").addClass("icon_down");
        $("#mask").hide();
        $('.panel_1').hide();

        $(this).addClass("checked");
        $(this).siblings().removeClass("checked");

        var abilityVal = $(this).find('input[name=ability]').val();

        var typeLi = $('.type_category').children(".checked");
        var typeVal = $(typeLi).find('input[name=type]').val();

        var sortLi = $('.sort_category').children(".checked");
        var sortVal = $(sortLi).find('input[name=sort]').val();

        var ageLi = $('.age_category').children(".checked");
        var beginAgeVal = $(ageLi).find('input[name=beginAge]').val();
        var endAgeVal = $(ageLi).find('input[name=endAge]').val();

        var keywordVal = $('#cur_search_id').val();
        var params = {};
        if(keywordVal != '' && keywordVal!=null){
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal, keyword: keywordVal};
        }else{
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
        }
        console.log(params);
        localStorage.setItem('varity_params',JSON.stringify(params));
        app.jquery.ajax({
            type:'post',
            url:'/activities' ,
            cache:false,
            data:params,
            success:function(result)
            {
                if(result.msg == 'success')
                {
                    item_list(result);
                    thisview.render({
                        bindings: bindings
                    });
                    if($('#cur_search_id').val()!='' && $('#cur_search_id').val()!=null){
                        $('.catch').hide();
                        $('#find-searches').html(keywordVal);
                        $("#find-searches").css('background-color','#57524d');
                        $('#cur_search_id').val(keywordVal);
                        $('.icon_find_close').css('display','block');
                    }else{
                        $('.icon_find_close').css('display','none');
                        $('#cur_search_id').val('');
                        $('.catch').show();
                        $('#find-searches').html('搜索');
                        $("#find-searches").css('background-color','#fff');
                    }
                    app.jquery(".page-content").scrollTop(0);
                }
            }
        });
    }

    function sort_submit() {
        $(".tab-link").eq(2).text($(this).find('a').text());
        $('#tab3').css('display', 'none');
        $(".tab-link").find(".icon").removeClass("icon_up").addClass("icon_down");
        $("#mask").hide();
        $('.panel_1').hide();

        $(this).addClass("checked");
        $(this).siblings().removeClass("checked");

        var abilityLi = $('.ability_category').children(".checked");
        var abilityVal = $(abilityLi).find('input[name=ability]').val();

        var typeLi = $('.type_category').children(".checked");
        var typeVal = $(typeLi).find('input[name=type]').val();

        var sortVal = $(this).find('input[name=sort]').val();

        var ageLi = $('.age_category').children(".checked");
        var beginAgeVal = $(ageLi).find('input[name=beginAge]').val();
        var endAgeVal = $(ageLi).find('input[name=endAge]').val();

        var keywordVal = $('#cur_search_id').val();
        var params = {};
        if(keywordVal != '' && keywordVal!=null){
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal, keyword: keywordVal};
        }else{
            params = {index: 0, limit: 10, beginAge: beginAgeVal, endAge: endAgeVal, type: typeVal, sort: sortVal, ability: abilityVal};
        }
        console.log(params);
        localStorage.setItem('varity_params',JSON.stringify(params));
        app.jquery.ajax({
            type:'post',
            url:'/activities' ,
            cache:false,
            data:params,
            success:function(result)
            {
                if(result.msg == 'success')
                {
                    item_list(result);
                    thisview.render({
                        bindings: bindings
                    });
                    if($('#cur_search_id').val()!='' && $('#cur_search_id').val()!=null){
                        $('.catch').hide();
                        $('#find-searches').html(keywordVal);
                        $("#find-searches").css('background-color','#57524d');
                        $('#cur_search_id').val(keywordVal);
                        $('.icon_find_close').css('display','block');
                    }else{
                        $('.icon_find_close').css('display','none');
                        $('#cur_search_id').val('');
                        $('.catch').show();
                        $('#find-searches').html('搜索');
                        $("#find-searches").css('background-color','#fff');
                    }
                    app.jquery(".page-content").scrollTop(0);
                }
            }
        });
    }

    function item_list(output) {
        var commentCount = output.data.maxCount || 0;
        $('#commentCount').val(commentCount);
        var char = '';

        var item = output.data.activities || [];
        if(item.length > 0){
            $.each(item, function(k, v) {
                char += '<li class="is_li">' +
                    '<div class="item-content">' +
                    "<a onclick=\"item_link('activityDetail?activityId="+v['activityId']+"')\" class=\"item-link external\">" +
                    '<div class="item-media">';
                char += '<img class="lazy" data-original=' + v['mainPicture'] +' onerror="onerror=null;src=\'http://o6zo3xy1k.bkt.clouddn.com/favicon.png\''+img_ios320+'">';

                char +=
                    '</div>' +
                    '</a>' + '<div class="item-inner">' +
                    "<a onclick=\"item_link('activityDetail?activityId=" + v['activityId'] + "')\" class=\"item-link external\">" +
                    '<div class="item-title-row">' + '<div class="item-title">' + v['title'] + '</div>' +
                    '</div><div class="item-subtitle">活动时间：' + v['time'].slice(0,-3) + '</div>' + '<div class="p-outer"><div class="p-bar"><div style="background-color:blue; height:8px; width:' + Math.round(v['currentNum']*100/v['limitNum']) + '%"></div>' +
                    '</div></div><div class="p-i-infos"><div class="fore1"><div class="num">' + v['currentNum'] + '/' +v['limitNum'] + '</div><div class="p-num">已报名</div></div>' +
                    '<div class="fore2"><div class="num">' + compute_leftTime(v['deadline']) + '</div><div class="p-num">剩余时间</div></div><div class="fore3"><div class="num">￥' + v['price'] +
                    '</div><div class="p-num">活动价格</div></div></div></a></div></div></li>';
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

    function item_link(cur_link) {
        localStorage.setItem('activities_scolltop', $$('.page-content').scrollTop());
        location.href = cur_link;
    }

    //分类切换效果
    function tab_switch(){
        var index = $(this).index() + 1;
        var display = $('#tab' + index).css('display');
        if (display == 'none') {
            $('#tab' + index).css('display', 'block');
            $('#tab' + index).siblings().css("display", "none");
            $(".buttons-row .tab-link .icon").removeClass("icon_up").addClass("icon_down");
            $(this).find(".icon").removeClass("icon_down").addClass("icon_up");
            $("#mask").show();
            $('.panel_1').show();

        } else {
            $('#tab' + index).css('display', 'none');
            $('#tab' + index).siblings().css("display", "none");
            $(this).find(".icon").removeClass("icon_up").addClass("icon_down");
            $("#mask").hide();
            $('.panel_1').hide();
        }
    }

    //点击遮罩关闭分类
    function close_mask(){
        $(this).hide();
        $('.tab').css('display', 'none');
        $(".buttons-row .tab-link .icon").removeClass("icon_up").addClass("icon_down");
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

    return {
        init: init
    };

});