var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    name: String,
    sex: String,
    age: Number,
    mobile: String,
    orderNo: Number,
    price: Number,
    userId: String,
    activityId: Number,
    activityTitle: String,
    activityPic: String,
    activityTime: String,
    state: Boolean,
    orderTime: Date,
    createTime: Date,
    updateTime: Date
});

module.exports = mongoose.model('Order', OrderSchema);


