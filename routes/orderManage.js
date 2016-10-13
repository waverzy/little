var express = require('express');
var router = express.Router();

var Order = require('../models/order.js');

//var mongoose = require('mongoose');
//var settings = require('../settings');
//mongoose.connect('mongodb://' + settings.host + '/' + settings.db);

router.get('/', function(req, res) {
    res.render('orderManage');
});

router.post('/', function(req, res) {
    var index = req.body.index,
        limit = req.body.limit,
        user_id = req.body.user_id;
    Order.getByUserId(index, limit, user_id, function(err, orders, count) {
        if (err) {
            return res.send({'msg': err});
        }
        return res.send({'msg': 'success', 'data': {'orders': orders, 'maxCount': count}});
    })
});
module.exports = router;
