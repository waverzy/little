var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res) {
    var mobile = req.body.mobile,
        password = req.body.password;

    User.getByMobile(mobile, function(err, user) {
        if(err) {
            return res.send({'msg': err, 'code': '2001'});
        }
        if(user) {
            if(user.password == password) {
                return res.send({'msg': 'success', 'data': {'mobile': user.mobile, 'user_id': user._id.toString()}});
            } else {
                return res.send({'msg': '密码错误', 'code': '1002'});
            }
        }
        return res.send({'msg': '用户不存在', 'code': '1001'});
    })
});

module.exports = router;
