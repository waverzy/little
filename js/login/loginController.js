define(["main", "login/loginView"], function(app,thisview) {
    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [{
        element: '.mobile-after',
        event: 'click',
        handler: mobile_delete
    },{
        element: '.password-after',
        event: 'click',
        handler: password_delete
    },{
        element: '.login_submit',
        event: 'click',
        handler: login_submit
    }];

    function mobile_delete(){
        $(this).click(function(){
            $('.mobile').val('');
        });
    }

    function password_delete(){
        $(this).click(function(){
            $('.password').val('');
        });
    }

    function login_submit(){
        var mobile = $('.mobile').val();
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
                    type: 'post',
                    url: 'login',
                    cache:false,
                    data:{mobile: mobile, password: $.md5(password)},
                    success:function(result){
                        if(result.msg == 'success'){
                            localStorage.setItem('mobile', result.data.mobile);
                            localStorage.setItem('user_id', result.data.user_id);
                            app.f7.alert('登录成功','温馨提示');
                            setTimeout(function(){
                                app.f7.closeModal();
                            },2000);
                            location.href = document.referrer;
                        }else{
                            console.log(result.code);
                            if(result.code == '1001'){
                                app.f7.alert(result.msg,'温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);
                                location.href = 'register';
                            } else {
                                app.f7.alert(result.msg,'温馨提示');
                                setTimeout(function(){
                                    app.f7.closeModal();
                                },2000);
                            }
                        }
                    }
                });
            }
        }
    }
    /**
     * 初始化
     */
    function init() {
        console.log("[login]init begin");
        var mobile = localStorage.getItem('mobile');
        if(mobile == null){
            thisview.render({
                bindings: bindings
            });
        }else{
            var refer = localStorage.getItem('LoginReferer');
            if(refer == null) {
                location.href = '/';
            } else {
                location.href = refer;
            }
        }
        console.log("[login]init end");
    }

    return {
        init: init
    };
});