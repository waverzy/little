var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var settings = require('./settings');
var router = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var activities = require('./routes/activities');
var activityDetail = require('./routes/activityDetail');
var orderPay = require('./routes/orderPay');
var login = require('./routes/login');
var forgetPassword = require('./routes/forgetPassword');
var mine = require('./routes/mine');
var userInfo = require('./routes/userInfo');
var orderManage = require('./routes/orderManage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerHelper('if_eql', function(value1, value2, options) {
  if(value1 == value2) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
});
hbs.registerHelper('if_empty', function(value, options) {
  if(value==undefined || value==0 || value==false || value==null || value==[] || value=='') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('convert_date', function(date, options) {
  var newDate = new Date(date);
  return newDate.getFullYear()+"年"+(newDate.getMonth()+1)+"月"+newDate.getDate()+"日 "+newDate.getHours()+":"+newDate.getMinutes();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(session({
  secret: settings.cookieSecret
}));

app.use('/', router);
app.use('/register', register);
app.use('/activities', activities);
app.use('/users', users);
app.use('/activityDetail', activityDetail);
app.use('/orderPay', orderPay);
app.use('/login', login);
app.use('/forgetPassword', forgetPassword);
app.use('/mine', mine);
app.use('/userInfo', userInfo);
app.use('/orderManage', orderManage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
