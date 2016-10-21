"use strict";

define(["main","userInfo/userInfoView"], function(app, thisview) {

    var bindings = [{
        element: '#baseInfoSubmit',
        event: 'click',
        handler: click_Submit
    }
    ];

    function init() {
        console.log("[date] init start")
        var user_id = localStorage.getItem('user_id');
        if(user_id == null){
            //注册要跳回的时候使用的缓存
            localStorage.setItem(REGISTER_REFERER,'userInfo');
            app.f7.alert('请先登录','温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        }else{
            $.ajax({
                type: 'POST',
                url: '/userInfo',
                cache: false,
                data: {
                    type: 'query',
                    user_id: user_id
                },
                success: function(data_output) {
                    if (data_output.msg == 'success') {
                        var userInfo = data_output.data.userInfo;
                        var avatar = userInfo.avatar;
                        if (avatar == null || avatar == '') {
                            avatar = "http://o6zo3xy1k.bkt.clouddn.com/vip_portrait.png";
                        }
                        $('.vip_portrait').attr('src', avatar);
                        $('input[name="nickname"]').val(userInfo.nickname);
                        $('input[name="name"]').val(userInfo.name);
                        $('.sex .item-after').text(userInfo.sex);
                        $('.age .item-after').text(userInfo.age);

                        thisview.render({
                            bindings: bindings
                        });
                    } else {
                        app.f7.alert(data_output.msg, '温馨提示');
                        localStorage.clear();
                        localStorage.setItem(REGISTER_REFERER,'userInfo');
                        setTimeout(function(){
                            location.href = 'login';
                        },2000);
                    }
                },
                error: function(data_output) {
                    app.f7.alert('致命错误','温馨提示')
                }
            });
        }
        $("#status").fadeOut(SPEED_FADEOUT);
        $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
        console.log("[date] init end")
    }


    function click_Submit() {
        var $$ = Dom7;
        var user_id = localStorage.getItem('user_id');
        if(user_id == null){
            //注册要跳回的时候使用的缓存
            localStorage.setItem(REGISTER_REFERER,'userInfo');
            app.f7.alert('请先登录', '温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        }else {
            var nickname = $('input[name="nickname"]').val(),
                name = $('input[name="name"]').val(),
                sex = $('.sex .item-after').text(),
                age = $('.age .item-after').text();
            if(nickname == null || nickname == "") {
                app.f7.alert('请输入昵称', '温馨提示');
                return;
            }
            if(name == null || name == "") {
                app.f7.alert('请输入姓名', '温馨提示');
                return;
            }
            if(sex == null || sex == "") {
                app.f7.alert('请选择性别', '温馨提示');
                return;
            }
            if(age == null || age == "") {
                app.f7.alert('请选择年龄', '温馨提示');
                return;
            }
            $.ajax({
                type: 'POST',
                url: '/userInfo',
                cache: false,
                data: {
                    type: 'update',
                    user_id: user_id,
                    nickname: nickname,
                    name: name,
                    sex: sex,
                    age: age
                },
                success: function (data_output) {
                    if (data_output.msg == 'success') {
                        app.f7.alert("修改信息成功", '温馨提示');
                        setTimeout(function () {
                            app.f7.closeModal();
                            location.href = 'mine';
                        }, 2000);

                    } else {
                        localStorage.clear();
                        localStorage.setItem(REGISTER_REFERER,'userInfo');
                        app.f7.alert(data_output.msg, '温馨提示');
                        setTimeout(function(){
                            location.href = 'login';
                        },2000);
                    }
                },
                error: function (data_output) {
                    app.f7.alert('致命错误', '温馨提示');
                    setTimeout(function () {
                        app.f7.closeModal();
                    }, 2000);
                }
            });
        }
    }


    return {
        init: init
    };
});