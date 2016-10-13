define(function(template) {
    var $ = Dom7;

    function render(params) {
        //搜索框图片
        $('.search').attr('src',up_qiniu_link+'seacher_bg.png'+img_ios640);
        bindEvents(params.bindings);
    }

    function reRender(params) {

    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        reRender: reRender
    };
});