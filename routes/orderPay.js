var express = require('express');
var router = express.Router();

var Order = require('../models/order.js');
var Activity = require('../models/activity.js');

router.get('/', function(req, res) {
    res.render('orderPay');
});

router.post('/', function(req, res) {
    var user_id = req.body.user_id,
        activityId = req.body.activityId,
        name = req.body.name,
        sex = req.body.sex,
        age = req.body.age,
        mobile = req.body.mobile,
        state = req.body.state;
    Activity.getByActivityId(activityId, function(err, activity) {
        if(err || activity == null) {
            var newOrder = new Order({
                userId: user_id,
                activityId: activityId,
                name: name,
                sex: sex,
                age: age,
                mobile: mobile,
                state: state
            });
        } else {
            var newOrder = new Order({
                userId: user_id,
                activityId: activityId,
                name: name,
                sex: sex,
                age: age,
                mobile: mobile,
                state: state,
                activityTitle: activity.title,
                activityPic: activity.mainPicture,
                activityTime: activity.time
            });
        }
        newOrder.save(function (err, order) {
            if (err) {
                return res.send({'msg': err});
            }
            return res.send({'msg': 'success', 'data': {'orderNo': order.orderNo}});
        });
    });
});

module.exports = router;
