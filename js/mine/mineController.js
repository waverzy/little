define(["main","mine/mineView"], function(app,thisview) {
    var bindings = [{
        element: '.logout',
        event: 'click',
        handler: logout
    }];

    function logout(){
        localStorage.clear();
        app.f7.alert('退出登录成功','温馨提示');
        setTimeout(function(){
            location.href = '/';
        },1500);
    }

    function init() {
        thisview.render({
            bindings: bindings
        });
        console.log("[mine] init start");
        var user_id = localStorage.getItem('user_id');
        if(user_id == null){
            localStorage.setItem('RegisterReferer','mine');
            app.f7.alert('请先登录','温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        }else{
            $.ajax({
                type: 'POST',
                url: 'mine',
                cache: false,
                data: {
                    user_id: user_id
                },
                success: function(data_output){
                    var userInfo = data_output.data.userInfo;
                    var avatar = userInfo.avatar;
                    if(avatar == null || avatar == '') {
                        avatar = "http://o6zo3xy1k.bkt.clouddn.com/vip_portrait.png";
                    }
                    var nickname = userInfo.nickname;
                    if(nickname == null || nickname == '') {
                        nickname = userInfo.mobile;
                    }
                    var age = userInfo.age;
                    if(age == null || age == '') {
                        age = "完善个人资料";
                    } else {
                        age = age + "岁";
                    }
                    var char = '<div class=" item-media"><img class="vip_portrait" src="' + avatar +'"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+
                                nickname + '</div></div><div class="item-subtitle">' + age + '</div></div>';
                    $('#userBaseInfo').append(char);
                    //是否有未读消息
                    var nread = data_output.data.nread || 0;
                    if(nread > 0){
                        $('.nread').addClass('badge small-badge');
                    }
                },
                error: function(data_output) {
                    app.f7.alert('致命错误','温馨提示');
                    console.log(data_output.data);
                }
            });
        }
        $("#status").fadeOut(SPEED_FADEOUT);
        $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
        console.log("[mine] init end")
    }

    return {
        init: init
    };
});