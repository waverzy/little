define(['main',"register/registerView"],function(app,thisview){
    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [{
        element: '.yzm-code',
        event: 'click',
        handler: getCode
    },{
        element: '.submit_register',
        event: 'click',
        handler: register
    }];
    //倒计时
    var second_count=60;
    function sub_second(){
        second_count=second_count-1;
        if(second_count ==0){
            second_count = 60;
            $(".second").text("重新获取验证码");
            //清除timeoutID
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
            setTimeout(function(){
                app.f7.closeModal();
            },2000);
            return false;
        }else if(!ex.test(mobile)){
            app.f7.alert('手机号码格式不正确','温馨提示');
            setTimeout(function(){
                app.f7.closeModal();
            },2000);
            return false;
        }else{
            if(second_count == 60){
                app.jquery.ajax({
                    type:'post',
                    url: '/verifyCode',
                    cache:false,
                    data:{mobile:mobile,flag:'register'},
                    success:function(output){
                        if(output.msg == 'success'){
                            console.log(output);
                            var send_code = output.data.send_code;
                            $('input[name=send_code]').val(send_code);
                            app.f7.alert('手机验证码发送成功','温馨提示');
                            setTimeout(function(){
                                app.f7.closeModal();
                            },2000);
                            sub_second();
                        }else{
                            if(output.data.code == '61999'){
                                app.f7.alert(output.msg,'温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);
                            }else{
                                app.f7.alert('手机验证码发送失败，请联系客服','温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);
                            }
                        }
                    }
                });
            }else{
                app.f7.alert('手机验证码正在发送中','温馨提示');
                setTimeout(function(){
                    app.f7.closeModal();
                },2000);
                return false;
            }
        }


    }

    //注册提交
    function register(){
        var mobile = $('.mobile').val();
        var message = $('.msgcode').val();
        var password = $('.password').val();
        //手机号码
        var ex = /^0?1[34578]\d{9}$/;
        if(mobile == ''){
            app.f7.alert('请输入手机号码','温馨提示');
            setTimeout(function(){
                app.f7.closeModal();
            },2000);
            return false;
        }else if(!ex.test(mobile)){
            app.f7.alert('手机号码格式不正确','温馨提示');
            setTimeout(function(){
                app.f7.closeModal();
            },2000);
            return false;
        }else{
            //短信验证码
            if(message == ''){
                app.f7.alert('请输入短信验证码','温馨提示');
                setTimeout(function(){
                    app.f7.closeModal();
                },2000);
                return false;
            }else{
                //密码
                if(password == ''){
                    app.f7.alert('密码不能为空','温馨提示');
                    setTimeout(function(){
                        app.f7.closeModal();
                    },2000);
                    return false;
                }else if(!(/^[0-9a-zA-Z]{6,16}$/.test(password))){
                    app.f7.alert('密码应由6-16位数字、字母或符号组成','温馨提示');
                    setTimeout(function(){
                        app.f7.closeModal();
                    },2000);
                    return false;
                }else{
                    app.jquery.ajax({
                        type:'post',
                        url:'/register',
                        cache:false,
                        data:{mobile: mobile, password: $.md5(password), msg_code: message},
                        success:function(result){
                            console.log(result);
                            if(result.msg == 'success'){
                                var beMember = localStorage.getItem('RegisterReferer');
                                localStorage.clear();
                                localStorage.setItem('mobile',result.data.mobile);
                                localStorage.setItem('user_id', result.data.user_id);
                                localStorage.setItem('RegisterReferer',beMember);
                                app.f7.alert('注册成功','温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);

                                if(beMember==null || beMember==''){
                                    location.href = '/';
                                }else if(beMember.indexOf('mine') != -1){
                                    location.href = beMember;
                                }else if(beMember.indexOf('activityDetail') != -1){
                                    location.href = beMember;
                                }else if(beMember.indexOf('activities') != -1){
                                    location.href = beMember;
                                }else{
                                    location.href='/';
                                }
                            }else{
                                app.f7.alert(result.msg,'温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);
                                return false;
                            }
                        },
                        error:function(result) {
                            console.log(result);
                        }
                    });
                }
            }
        }
    }

	function init(){
		console.log("[register] init start");
        //检测是否已经登录
        var mobile = localStorage.getItem('mobile');
        if(mobile != null && mobile != ''){
            location.href = '/';
        }else{
            thisview.render({
                bindings: bindings
            });
        }
		console.log("[register] init end");
	}
	return{
		init:init
	}

});