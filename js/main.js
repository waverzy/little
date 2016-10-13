require.config({
    paths: {
        text: "lib/text",
        jquery: "lib/jquery-1.11.1",
        md5: "lib/jquery.md5"
    }
});

define('main', ['./router', './utils', 'jquery', 'md5'], function(Router, Utils, JQuery) {
    Router.init();
    var f7 = new Framework7({
        swiperPanel: 'left',
        animateNavBackIcon: true
    });
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    return {
        f7: f7,
        mainView: mainView,
        router: Router,
        utils: Utils,
        jquery: JQuery
    };
});