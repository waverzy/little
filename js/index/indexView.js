define(function() {
    var $ = Dom7;

    function render(params) {
        $('.new_comer_href').attr('href', NEW_COMER_HREF);
        $('.invi_gift_href').attr('href', INVI_GIFT_HREF);
        $('.consume_promise_href').attr('href', CONSUME_PROMISE_HREF);
        $('.rearing_kits_href').attr('href', REARING_KITS_HREF);

        $('.toy_group_href').attr('href', TOY_GROUP_HREF);
        $('.toy_group_src').attr('src', TOY_GROUP_SRC);
        $('.new_sync_href').attr('href',NEWS_SYNC_HREF);
        $('.new_sync_src').attr('src',NEWS_SYNC_SRC);
        $('.baby_party_href').attr('href',BABY_PARTY_HREF);
        $('.baby_party_src').attr('src',BABY_PARTY_SRC);
        $('.history_topic_href').attr('href',HISTORY_TOPIC_HREF);
        $('.history_topic_src').attr('src',HISTORY_TOPIC_SRC);

        bindEvents(params.bindings);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render
    };
});