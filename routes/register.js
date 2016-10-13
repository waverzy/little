var express = require('express');
var router = express.Router();

var crypto = require('crypto'),
    User = require('../models/user.js');

var mongoose = require('mongoose');
var settings = require('../settings');
mongoose.connect('mongodb://' + settings.host + '/' + settings.db);

router.get('/', function(req, res) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    var password = req.body.password,
        mobile = req.body.mobile;
    var newUser = new User({
        password: password,
        mobile: mobile
    });

    User.getByMobile(newUser.mobile, function (err, user) {
        if (err) {
            return res.send({'msg': err});
        }
        if (user) {
            return res.send({'msg': '该手机号已注册过，请使用其它手机注册！'});
        }
        newUser.save(function (err, user) {
            if (err) {
                return res.send({'msg': err});
            }
            req.session.user = user;
            return res.send({'msg': 'success', 'data': {'mobile': user.mobile, 'user_id': user._id.toString()}});
        });
    });
});

module.exports = router;
