var mongoose = require('mongoose');

var UserModel = require('./UserModel');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.mobile = user.mobile;
    this.createTime = user.createTime;
    this.updateTime = user.updateTime;
}

module.exports = User;

User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        mobile: this.mobile,
        createTime: new Date(),
        updateTime: new Date()
    };
    var newUser = new UserModel(user);

    newUser.save(function (err, user) {
        if(err) {
            return callback(err);
        }
        callback(err, user);
    });
};

User.getByObjectId = function(id, callback) {
    UserModel.findOne({_id: mongoose.Types.ObjectId(id)}, function (err, user) {
        if(err) {
            return callback(err);
        }
        callback(err, user);
    });
};

User.getByMobile = function(mobile, callback) {
    UserModel.findOne({mobile: mobile}, function (err, user) {
        if(err) {
            return callback(err);
        }
        callback(err, user);
    });
};

User.getByPassword = function(mobile, password, callback) {
    UserModel.findOne({mobile: mobile, password: password}, function (err, user) {
        if(err) {
            return callback(err);
        }
        callback(err, user);
    });
};

User.updatePassword = function(mobile, password, callback) {
    UserModel.update({mobile: mobile}, {$set: {password: password, updateTime: new Date()}}, {safe: true}, function(err, row){
        if(err) {
            return callback(err);
        }
        callback(err, row);
    });
};

User.updateUserInfoByObjectId = function(id, nickname, name, sex, age, callback) {
    UserModel.update({_id: mongoose.Types.ObjectId(id)}, {$set: {nickname: nickname, name: name, sex: sex, age: age, updateTime: new Date()}}, {safe: true}, function(err, row){
        if(err) {
            return callback(err);
        }
        callback(err, row);
    });
};