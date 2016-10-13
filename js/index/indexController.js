define(["main", "index/indexView"], function (app, thisview) {
    /*var bindings = [
        {
            element: '.mine',
            event: 'click',
            handler: redirect_mine
        }
    ];

    function redirect_mine(){
        var user_id = localStorage.getItem('user_id');
        if(user_id == null){
            localStorage.setItem('RegisterReferer','mine');
            app.f7.alert('请先登录','温馨提示');
            setTimeout(function(){
                location.href = 'login';
            },2000);
        } else {
            $("input[name='user_id']").val(user_id);
            $('#mineForm').submit();
        }
    }*/

    function init() {
        /*thisview.render({
            bindings: bindings
        });*/

        var mySwiper = app.f7.swiper('.swiper-container', {
            pagination: '.swiper-container .swiper-pagination',
            autoplay: 3000,
            loop: true
        });

        $("#status").fadeOut(SPEED_FADEOUT);
        $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);
        app.jquery.ajax({
            type: 'post',
            url: SERVER_URL + API_URL + API_H_GetPageData,
            cache: false,
            data: {user_id: user_id},
            success: function (output) {
            }
        });
    }

    return {
        init: init
    };
});