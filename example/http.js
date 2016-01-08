var express = require('express');
var path = require('path');
var router = express.Router();

var app = express();

app.get('/getData', function (req, res) {
  var arry = [];
  var length = req.query.pageSize || 10;
  var number = req.query.pageIndex || 0;
  for(var i=1; i<=length ; i++){
    arry.push(10 *number + i);
  }
  res.send({data: arry, total: 102});
});

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
  res.status(err.status || 500).end();
});


app.listen(3030)