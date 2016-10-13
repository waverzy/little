define(function() {
    var $ = Dom7;

    function init() {
        $(document).on('pageBeforeInit', function(e) {
            var page = e.detail.page;
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicorMessenger/i) == 'micromessenger'){
                $('.navbar_none').css('display', 'none');
                $('.page-gap').css('padding-top', '0px');
            }
            load(page.name, page.query, page.view);
        })
    }

    function load(controllerName, query, view) {
        require([controllerName + '/' + controllerName + 'Controller'], function(controller){
            controller.init();
        })
    }

    return {
        init: init,
        load: load
    };
});
