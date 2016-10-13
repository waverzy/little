define(["main","forgetPassword/forgetPasswordView"], function(app,thisview) {
    var bindings = [{
        element: '.yzm-code',
        event: 'click',
        handler: getCode
    },{
        element: '.find_submit',
        event: 'click',
        handler: find_submit
    }];

    //倒计时
    var second_count=60;
    function sub_second(){
        second_count=second_count-1;
        if(second_count ==0){
            second_count = 60;
            $(".second").text("重新获取验证码");
            clearTimeout(tid);
        }else{
            $(".second").text("("+second_count+")重新获取");
            tid = setTimeout(function(){sub_second();}, 1000);
        }
    }
    //获取验证码
    function getCode(){
        var mobile = $('.mobile').val();
        //手机号码
        var ex = /^0?1[34578]\d{9}$/;
        if(mobile == ''){
            app.f7.alert('请输入手机号码','温馨提示');
            return false;
        }else if(!ex.test(mobile)){
            app.f7.alert('手机号码格式不正确','温馨提示');
            return false;
        }
        if(second_count == 60){
            app.jquery.ajax({
                type:'post',
                url: '/verifyCode',
                cache:false,
                data:{mobile:mobile,flag:'findpassword'},
                success:function(output){
                    if(output.msg == 'success'){console.log(output);
                        var send_code = output.data.send_code;
                        $('input[name=send_code]').val(send_code);
                        app.f7.alert('手机验证码发送成功','温馨提示');
                        setTimeout(function(){
                            app.f7.closeModal();
                        },2000);
                        sub_second();
                    }else{
                        app.f7.alert('手机验证码发送失败，请联系客服','温馨提示');
                        setTimeout(function(){
                            app.f7.closeModal();
                        },2000);
                    }
                }
            });
        }else{
            app.f7.alert('手机验证码正在发送中','温馨提示');
            return false;
        }
    }

    //找回密码操作
    function find_submit(){
        var mobile = $('.mobile').val();
        var msg_code = $('.msg_code').val();
        var password = $('.password').val();
        var send_code = $('input[name=send_code]').val();
        //手机号码
        var ex = /^0?1[34578]\d{9}$/;
        if(mobile == ''){
            app.f7.alert('请输入手机号码','温馨提示');
            return false;
        }else if(!ex.test(mobile)){
            app.f7.alert('手机号码格式不正确','温馨提示');
            return false;
        }
        //短信验证码
        if(msg_code == ''){
            app.f7.alert('请输入短信验证码','温馨提示');
            return false;
        }
        //密码
        if(password == ''){
            app.f7.alert('密码不能为空','温馨提示');
            return false;
        }else if(!(/^[0-9a-zA-Z]{6,16}$/.test(password))){
            app.f7.alert('密码应由6-16位数字、字母或符号组成','温馨提示');
            return false;
        }
        app.jquery.ajax({
            type:'post',
            url: '/forgetPassword',
            cache:false,
            data:{mobile: mobile, password: $.md5(password), msg_code: msg_code},
            success:function(result){
                if(result.msg == 'success'){
                    app.f7.alert('找回密码成功','温馨提示');
                    location.href = 'login';
                }else{
                    app.f7.alert(result.msg,'温馨提示');
                }
            }
        });

    }
    /**
     * 初始化
     */
    function init() {
        console.log("[forgetPassword]init begin");
        thisview.render({
            bindings: bindings
        });
        console.log("[forgetPassword]init end");
    }
    return{
        init:init
    }
});
