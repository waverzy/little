define(["main","orderPay/orderPayView"],function(app,thisview){

    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */

    var bindings = [
        {
            element: '.change_pay_type',
            event: 'click',
            handler: change_pay_type
        },{
            element:'.pay_order',
            event:'click',
            handler:pay_order
        },{
            element:'#mask',
            event:'click',
            handler:close_mask
        }
    ];

    function pay_order(){
        var user_id = localStorage.getItem('user_id');
        if(user_id == null){
            app.f7.alert('请先登录','温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        }else{
            placeOrder(user_id, getQueryString('activityId'));
            var cur_select_pay_id = $('.cur_select_pay_id').val();
            if(cur_select_pay_id == 0 || cur_select_pay_id == '' || cur_select_pay_id == undefined || cur_select_pay_id == null){
                app.f7.alert('请选择支付方式','温馨提示');
                return;
            }else{
                var pay_type = 'wechat';
                if(cur_select_pay_id==1){
                    pay_type = 'aliwap';
                }
                $('#mask').show();
                $('.weixin_popup').css('display', 'block');
            }
        }
    }

    function change_pay_type(){
            var pay_id = $(this).data('id');
            if(pay_id == 1){
                $('.zhifubao').addClass('check');
                $('.weixin').removeClass('check');
            }
            if(pay_id == 2){
                $('.weixin').addClass('check');
                $('.zhifubao').removeClass('check');
            }
    }

    function close_mask(){
        $(this).hide();
        $('.weixin_popup').css('display', 'none');
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function init(){
        var user_id = localStorage.getItem('user_id');
        var activityId = getQueryString('activityId')||'';
        if(activityId == '' || activityId==0) {
            app.f7.alert('信息有误，请重试','温馨提示');
            setTimeout(function(){
                location.href = 'activities';
            },2000);
        } else if(user_id == null) {
            localStorage.setItem(REGISTER_REFERER, 'orderPay?activityId='+activityId);
            app.f7.alert('请先登录', '温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        } else {
            thisview.render({
                bindings: bindings
            });
            if(is_weixn()){
                $('.zhifu_alipay').hide();
                $('.zhifu_weixin').show();
                $('.weixin').addClass('check');
                $('.zhifubao').removeClass('check');
                $('.cur_select_pay_id').val(2);
                $('#pay_app').removeClass('pay_order');
                $('#cur_weixin_pay_id').click(function(){
                    location.href =SERVER_URL + API_URL + API_Pay_index+'&user_id='+user_id+'&id='+cur_id+'&type=wechat';
                })
            }else{
                $('.zhifu_alipay').show();
                $('.zhifu_weixin').show();
                $('.cur_select_pay_id').val(1);
                $('.weixin').removeClass('check');
                $('.zhifubao').addClass('check');
            }
            $.ajax({
                type: 'POST',
                url: '/userInfo',
                cache: false,
                data: {
                    type: 'query',
                    user_id: user_id
                },
                success: function(data_output){
                    var userInfo = data_output.data.userInfo;
                    $('input[name="name"]').val(userInfo.name);
                    $('.sex .item-after').text(userInfo.sex);
                    $('.age .item-after').text(userInfo.age);
                    $('input[name="mobile"]').val(userInfo.mobile);
                    $('input[name="remobile"]').val(userInfo.mobile);

                    thisview.render({
                        bindings: bindings
                    });
                }
            });
        }
        $("#status").fadeOut(SPEED_FADEOUT);
        $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
    }

    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    function placeOrder(user_id, activityId) {
        var name = $('input[name="name"]').val(),
            sex = $('.sex .item-after').text(),
            age = $('.age .item-after').text(),
            mobile = $('input[name="mobile"]').val();
        $.ajax({
            type: 'POST',
            url: '/orderPay',
            cache: false,
            data: {
                user_id: user_id,
                activityId: activityId,
                name: name,
                sex: sex,
                age: age,
                mobile: mobile,
                state: 'false'
            },
            success: function(data_output){
                app.f7.alert('单号：'+ data_output.data.orderNo, '温馨提示');
            }
        });
    }

    return{
        init:init
    }

});