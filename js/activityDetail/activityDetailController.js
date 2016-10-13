define(["main", "activityDetail/activityDetailView"], function(app, thisview) {

    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [
        {
            element: '.canshu',
            event: 'click',
            handler: click_canshu
        }, {
            element: '.jianjie',
            event: 'click',
            handler: click_jianjie
        }, {
            element: document,
            event: 'scroll',
            handler: scroll_location
        }, {
            element: '.right',
            event: 'click',
            handler: click_share
        }, {
            element: '.guanbi',
            event: 'click',
            handler: click_guanbi
        }, {
            element: '.mask',
            event: 'click',
            handler: click_mask
        }, {
            element: '#getup',
            event: 'click',
            handler: click_getup
        }, {
            element:'.hint-button',
            event:'click',
            handler:click_hint
        }, {
            element:'.enter',
            event:'click',
            handler:click_enter
        }
    ];

    function click_enter(){
        var myApp = new Framework7();
        var activityId = getQueryString('activityId');
        var user_id = localStorage.getItem('user_id');
        if (user_id == null) {
            $('.hint').show();
            $('.mask').show();
            $('.hint-text').html('请先登录，活动才能报名');
            setTimeout(function() {
                localStorage.setItem('LoginReferer','activityDetail?activityId='+activityId);
                location.href = 'login';
            }, 2000);
        }else{
            location.href = 'orderPay?activityId='+activityId;
        }
    }

    function click_hint(){
        $(".mask").hide();
        $('.hint').hide();
    }

    function click_getup(){
        app.jq(document.body).animate({scrollTop:0},1000);
    }

    var click_click_c = false;
    var click_click_j = false;

    /**
     * 初始化
     */
    function init() {
        thisview.render({
            bindings: bindings
        });

        var user_id = localStorage.getItem('user_id');
        if(user_id != null){
            $('.show_vip').hide();
        }

        $('.bchy').attr('href','register');

        var $body = $('body');
        document.title = '活动详情';
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);

        var mySwiper = app.f7.swiper('.swiper-container', {
            pagination: '.swiper-container .swiper-pagination',
            autoplay: 3000,
            loop: true
        });

        var shg = $(window).height();
        app.jquery("#toypara").css({'display': 'block',"min-height":shg});
        app.jquery("#toyintro").css({'display': 'block',"min-height":shg});

        $("#status").fadeOut(SPEED_FADEOUT);
        $("#preloader").delay(SPEED_DELAY).fadeOut(SPEED_STYLE);

        var mobile = localStorage.getItem('mobile');
        if(mobile != null && mobile != '') {
            $("#detail-mem").css("display","none");
        }
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function click_canshu() {
        click_click_c = true;
        click_click_j = false;
        var shg = $(window).height();
        app.jquery(this).addClass('active').siblings().removeClass('active');
        app.jquery("#toypara").css({'display': 'block',"min-height":shg});
        app.jquery("#toyintro").css({'display': 'none',"min-height":shg});
        var scrollY = app.jquery(document).scrollTop();
        var swiperH = app.jquery(".swiper-container").height();
        var infoH = app.jquery(".detail-info").height();
        var memH = app.jquery(".detail-mem").height();
        var topHH = swiperH + infoH + memH + 40;
        if (topHH <= scrollY) {
            app.jquery(document).scrollTop(topHH);
        }
    }

    function click_jianjie() {
        click_click_j = true;
        click_click_c = false;
        var shg = $(window).height();
        app.jquery(this).addClass('active').siblings().removeClass('active');
        app.jquery("#toyintro").css({'display': 'block',"min-height":shg});
        app.jquery("#toypara").css({'display': 'none',"min-height":shg});
        var scrollY = app.jquery(document).scrollTop();
        var swiperH = app.jquery(".swiper-container").height();
        var infoH = app.jquery(".detail-info").height();
        var memH = app.jquery(".detail-mem").height();
        var topHH = swiperH + infoH + memH + 40;
        if (topHH <= scrollY) {
            app.jquery(document).scrollTop(topHH);
        }
    }

    function click_share() {
        app.jquery(".mask").show();
        app.jquery(".share-btn").show();
    }

    function click_guanbi() {
        app.jquery(".mask").hide();
        app.jquery(".share-btn").hide();
    }
    function click_mask(){
        app.jquery(".mask").hide();
        app.jquery(".share-btn").hide();
        app.jquery('.hint').hide();
    }

    function scroll_location() {
        var scrollY = app.jquery(document).scrollTop();
        var swiperH = app.jquery(".swiper-container").height();
        var infoH = app.jquery(".detail-info").height();
        var memH = app.jquery(".detail-mem").height();
        var topHH = swiperH + infoH + memH + 40;
        var canshuH = app.jquery("#toypara").height();
        var jianjieH = app.jquery("#toyintro").height();
        var pingjiaH = app.jquery("#toyjudge").height();
        if (app.jquery(document).scrollTop()>200){
            app.jquery("#getup").fadeIn(800);
        }
        else
        {
            app.jquery("#getup").fadeOut(800);
        }
        var divY = app.jquery(".details-tab").offset().top;
        if(divY <= scrollY) {
            app.jquery(".details-tab").children(".buttons-row").css("position","fixed");
        } else {
            app.jquery(".details-tab").children(".buttons-row").css("position","relative");
        }

        if(!click_click_c && !click_click_j){
            if (scrollY > (topHH+canshuH)) {
                app.jquery(".jianjie").addClass("active");
                app.jquery(".canshu").removeClass("active");
            }else{
                if (scrollY > topHH) {
                    app.jquery(".jianjie").removeClass("active");
                    app.jquery(".canshu").addClass("active");
                }
            }
        }else{
            if(click_click_c){
                var shg = $(window).height();
                app.jquery("#toyintro").css({'display': 'block',"min-height":shg});
                click_click_c = false;
            }
        }
    }

    return {
        init: init
    };

});