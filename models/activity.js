var ActivityModel = require('./ActivityModel');

function Activity(activity) {
    this.title = activity.title;
    this.time = activity.time;
    this.mainPicture = activity.mainPicture;
    this.beginAge = activity.beginAge;
    this.endAge = activity.endAge;
    this.tags = activity.tags;
    this.limitNum = activity.limitNum;
    this.currentNum = activity.currentNum;
    this.price = activity.price;
    this.slidePictures = activity.slidePictures;
    this.site = activity.site;
    this.note = activity.note;
    this.deadline = activity.deadline;
    this.city = activity.city;
    this.brandIntro = activity.brandIntro;
    this.brandDesc = activity.brandDesc;
    this.detailPics = activity.detailPics;
    this.detailInfo = activity.detailInfo;
}

module.exports = Activity;

Activity.prototype.save = function(callback) {
    var activity = {
        activityId: new Date().getTime(),
        title: this.title,
        time: this.time,
        mainPicture: this.mainPicture,
        beginAge: this.beginAge,
        endAge: this.endAge,
        tags: this.tags,
        limitNum: this.limitNum,
        currentNum: this.currentNum,
        price: this.price,
        slidePictures: this.slidePictures,
        site: this.site,
        note : this.note,
        deadline : this.deadline,
        city: this.city,
        brandIntro: this.brandIntro,
        brandDesc: this.brandDesc,
        detailPics: this.detailPics,
        detailInfo: this.detailInfo
    };
    var newActivity = new ActivityModel(activity);

    newActivity.save(function (err, activity) {
        if(err) {
            return callback(err);
        }
        callback(err, activity);
    });
};

Activity.getAll = function(skip, limit, callback) {
    ActivityModel.count(function(err, count) {
        ActivityModel.find({}, null, {skip: skip, limit: limit},function (err, activities) {
            if(err) {
                return callback(err);
            }
            callback(err, activities, count);
        });
    });
};

Activity.getByActivityId = function(activityId, callback) {
    ActivityModel.findOne({activityId: activityId},function (err, activity) {
        if(err) {
            return callback(err);
        }
        callback(err, activity);
    });
};