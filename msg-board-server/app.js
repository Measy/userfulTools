var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var autoRoutes = require('express-auto-routes');
var CORS = require('./middlewares/CORS');
var simpleLogger = require('./middlewares/simpleLogger');
var simpleUserSession = require('./middlewares/simpleUserSession');

var app = express();
app.use(CORS);
app.use(simpleLogger);
app.use(simpleUserSession);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//auto mount routers
var routes = autoRoutes(app);
routes(path.join(__dirname, './controllers'));

// 404
app.use(function(req, res, next) {
  res.status(404);
  next({ _code: 404, _msg: 'Page not found' });
});

// global err handler
app.use(function(err, req, res, next) {
  console.error(err);
  
  if (err._status) res.status(err._status);

  res.json({
    _code: err._code || 1,
    _msg: err._msg || err
  });
});

if(!module.parent){
  var PORT = 8989;
  console.log('[INFO] Msg board RESTful API listening at localhost:%s', PORT);
  app.listen(PORT);
}else{
  module.exports = app;
}
