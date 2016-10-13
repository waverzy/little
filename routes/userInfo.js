var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
    res.render('userInfo');
});

router.post('/', function(req, res) {
    var type = req.body.type,
        user_id = req.body.user_id;
    if(type == "query") {
        User.getByObjectId(user_id, function(err, user) {
            if(err) {
                return res.send({'msg': err, 'code': '2002'});
            }
            if(user) {
                var temp = new Object();
                temp.mobile = user.mobile;
                temp.nickname = user.nickname;
                temp.name = user.name;
                temp.age = user.age;
                temp.sex = user.sex;
                temp.avatar = user.avatar;
                return res.send({'msg': 'success', 'data': {'userInfo': temp}});
            }
            return res.send({'msg': '用户信息不存在，请重新登录', 'code': '1004'});
        })
    } else if(type == "update") {
        User.getByObjectId(user_id, function (err, user) {
            if(err) {
                return res.send({'msg': err});
            }
            if(user == null) {
                return res.send({'msg': '该用户不存在'});
            } else {
                User.updateUserInfoByObjectId(user_id, req.body.nickname, req.body.name, req.body.sex, req.body.age, function(err, row) {
                    if(err) {
                        return res.send({'msg': err});
                    }
                    if(row.n > 0) {
                        return res.send({'msg': 'success'});
                    }
                    else {
                        return res.send({'msg': '更新个人资料失败'});
                    }
                });
            }
        });
    } else {
        return res.send({'msg': '操作不存在', 'code': '1005'});
    }
});

module.exports = router;
