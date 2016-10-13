var express = require('express');
var router = express.Router();

var Activity = require('../models/activity.js');

router.get('/', function(req, res) {
    var id = req.query.activityId;
    Activity.getByActivityId(id, function(err, activity) {
        if(err) {
            return res.send({'msg': err});
        }
        if(activity == null) {
            return res.redirect('activities');
        }
        res.render('activityDetail', {'detail': activity});
    })
});

router.post('/', function(req, res) {
    var index = req.body.index,
        limit = req.body.limit,
        beginAge = req.body.beginAge,
        endAge = req.body.endAge,
        type = req.body.type,
        sort = req.body.sort,
        ability = req.body.ability;
    Activity.getAll(index, limit, function(err, activities, count) {
        if (err) {
            return res.send({'msg': err});
        }
        return res.send({'msg': 'success', 'data': {'activities': activities, 'maxCount': count}});
    })
});
module.exports = router;
