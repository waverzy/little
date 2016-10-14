var express = require('express');
var router = express.Router();

var Activity = require('../models/activity.js');

//var mongoose = require('mongoose');
//var settings = require('../settings');
//mongoose.connect('mongodb://' + settings.host + '/' + settings.db);

router.get('/', function(req, res) {
    var newActivity = new Activity({
        title: '行走中的课题',
        time: '2016/10/09 09:30:00',
        mainPicture: 'https://img30.360buyimg.com/cf/jfs/t3019/168/1591355864/25217/681c2e62/57c7a575Nff9688b2.jpg',
        beginAge: 6,
        endAge: 12,
        tags: ['热门', '体验'],
        limitNum: 30,
        currentNum: 10,
        price: 100,
        slidePictures: ['https://cdn.atlassbx.com/FB/11087208966010/AZR_FY17-welcome-EN_US_300x250_BAN_Sept-16.png', 'https://cdn.atlassbx.com/FB/11087208966010/AZR_FY17-welcome-EN_US_300x250_BAN_Sept-16.png', 'https://cdn.atlassbx.com/FB/11087208966010/AZR_FY17-welcome-EN_US_300x250_BAN_Sept-16.png'],
        site: '上海市静安区zhabei路',
        note: 'notenotenotenote',
        deadline: '2016/10/08 09:30:00',
        city: '上海',
        brandIntro: ['http://www.ichido.com.cn/2016/web_new.jpg'],
        brandDesc: '宜芝多于1992年由蔡师傅在上海成立以严选原料与食材焙出热腾腾、香气迷人的面包每一个面包包藏着师傅的灵魂',
        detailPics: ['https://img30.360buyimg.com/cf/jfs/t3148/61/2513162716/96801/c0a3c059/57e239adN574028f8.jpg', 'https://img30.360buyimg.com/cf/jfs/t3058/66/2478204746/98989/97627a1e/57e22357N48e79d48.jpg'],
        detailInfo: '宜芝多于1992年由蔡师傅在上海成立以严选原料与食材焙出热腾腾、香气迷人的面包每一个面包包藏着师傅的灵魂'
    });
    newActivity.save(function (err, activity) {
        if (err) {
            console.log(err);
        }
    })
    res.render('activities');
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
