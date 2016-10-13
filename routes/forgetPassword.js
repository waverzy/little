var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
    res.render('forgetPassword');
});

router.post('/', function(req, res) {
    var password = req.body.password,
        mobile = req.body.mobile;

    User.getByMobile(mobile, function (err, user) {
        if(err) {
            return res.send({'msg': err});
        }
        if(user == null) {
            return res.send({'msg': '该用户不存在'});
        } else {
            User.updatePassword(mobile, password, function(err, row) {
                if(err) {
                    return res.send({'msg': err});
                }
                if(row.n > 0) {
                    return res.send({'msg': 'success'});
                }
                else {
                    return res.send({'msg': '更新密码失败'});
                }
            });
        }
    });
});

module.exports = router;
