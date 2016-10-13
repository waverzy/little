var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var carousel = [
    {"imageUrl":"http:\/\/o6r1e30ov.bkt.clouddn.com\/topic_20160630_5774d4c371ea8.jpg","text_input":"http:\/\/www.wanjudaojia.com\/mobile\/static\/newWelfare.html"},
    {"imageUrl":"http:\/\/o6r1e30ov.bkt.clouddn.com\/topic_20160630_5774d488d83aa.jpg","text_input":"http:\/\/www.wanjudaojia.com\/mobile\/static\/inviteGift.html"},
    {"imageUrl":"http:\/\/o6r1e30ov.bkt.clouddn.com\/topic_20160630_5774b7468b29b.jpg","text_input":"http:\/\/www.wanjudaojia.com\/mobile\/babyParty.html"}
  ];
  res.render('index', {
    swiperlist: carousel
  });
});

module.exports = router;
