var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
    activityId: Number,
    title: String,
    time: String,
    mainPicture: String,
    beginAge: Number,
    endAge: Number,
    tags: [String],
    limitNum: Number,
    currentNum: Number,
    price: Number,
    slidePictures: [String],
    site: String,
    note: String,
    deadline: String,
    city: String,
    brandIntro: [String],
    brandDesc: String,
    detailPics: [String],
    detailInfo: String
});

module.exports = mongoose.model('Activity', ActivitySchema);


