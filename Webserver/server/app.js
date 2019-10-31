const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const Aircleaner_Router = require('./routes/Aircleaner_Control');
const Airconditioner_Router = require('./routes/Airconditioner_Control');
const send_Sensor_Router = require('./routes/send_Sensor');
const Humid_Router = require('./routes/Humid_Control');
const aiSolution_Control_Router = require('./routes/aiSolution_Control');
const Mode_Router = require('./routes/Mode');
const TEST_Router = require('./routes/TEST_DATA');
var app = express();

app.set('port', process.env.PORT|| 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', send_Sensor_Router);
app.use('/Humid_Control',Humid_Router);
app.use('/AircleanerControl',Aircleaner_Router);
app.use('/AirconditionerControl',Airconditioner_Router);
app.use('/aiSolutionControl',aiSolution_Control_Router);
app.use('/Mode',Mode_Router);
app.use('/Test',TEST_Router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //
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
