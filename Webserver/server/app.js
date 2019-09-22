const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const sendSensorRouter = require('./routes/sendSensor');
const receiveCommandRouter = require('./routes/receiveCommand');

var app = express();

app.set('port', process.env.PORT|| 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', sendSensorRouter);
app.use('/command', receiveCommandRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;

let server = app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + server.address().port);
});
