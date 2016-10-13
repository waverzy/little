var OrderModel = require('./OrderModel');

function Order(order) {
    this.name = order.name;
    this.sex = order.sex;
    this.age = order.age;
    this.mobile = order.mobile;
    this.price = order.price;
    this.userId = order.userId;
    this.activityId = order.activityId;
    this.activityTitle = order.activityTitle;
    this.activityPic = order.activityPic;
    this.activityTime = order.activityTime;
    this.state = order.state;
    this.orderTime = order.orderTime;
    this.createTime = order.createTime;
    this.updateTime = order.updateTime;
}

module.exports = Order;

Order.prototype.save = function(callback) {
    var order = {
        name: this.name,
        sex: this.sex,
        age: this.age,
        mobile: this.mobile,
        orderNo: new Date().getTime(),
        price: this.price,
        userId: this.userId,
        activityId: this.activityId,
        activityTitle: this.activityTitle,
        activityPic: this.activityPic,
        activityTime: this.activityTime,
        state: this.state,
        orderTime: new Date(),
        createTime: new Date(),
        updateTime: new Date()
    };
    var newOrder = new OrderModel(order);

    newOrder.save(function (err, order) {
        if(err) {
            return callback(err);
        }
        callback(err, order);
    });
};

Order.getAll = function(skip, limit, callback) {
    OrderModel.count(function(err, count) {
        OrderModel.find({}, null, {skip: skip, limit: limit},function (err, orders) {
            if(err) {
                return callback(err);
            }
            callback(err, orders, count);
        });
    });
};

Order.getByUserId = function(skip, limit, userId, callback) {
    OrderModel.count(function(err, count) {
        OrderModel.find({userId: userId}, null, {skip: skip, limit: limit},function (err, orders) {
            if(err) {
                return callback(err);
            }
            callback(err, orders, count);
        });
    });
};