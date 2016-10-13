var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: String,
    password: String,
    mobile: String,
    //头像
    avatar: String,
    name: String,
    sex: String,
    age: Number,
    createTime: Date,
    updateTime: Date
});

module.exports = mongoose.model('User', UserSchema);


