var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
    res.render('mine');
});

router.post('/', function(req, res) {
    var user_id = req.body.user_id;

    User.getByObjectId(user_id, function(err, user) {
        if(err) {
            return res.send({'msg': err, 'code': '2002'});
        }
        if(user) {
            var temp = new Object();
            temp.nickname = user.nickname;
            temp.name = user.name;
            temp.age = user.age;
            temp.sex = user.sex;
            temp.avatar = user.avatar;
            return res.send({'msg': 'success', 'data': {'userInfo': temp}});
        }
        return res.send({'msg': '用户信息不存在，请重新登录', 'code': '1004'});
    })
});

module.exports = router;
