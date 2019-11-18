const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require('body-parser');

const Aircleaner_Router = require('./routes/Aircleaner_Control');
const Airconditioner_Router = require('./routes/Airconditioner_Control');
const send_Sensor_Router = require('./routes/send_Sensor');
const Humid_Router = require('./routes/Humid_Control');
const get_Solution_Status_Router = require('./routes/get_solution_status');
const Mode_Router = require('./routes/Mode');
const Reservation_Router = require('./routes/Reservation_Control');
const TEST_Router = require('./routes/TEST_DATA');
const app = express();

app.set('port', process.env.PORT|| 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', send_Sensor_Router);
app.use('/HumidControl',Humid_Router);
app.use('/AircleanerControl',Aircleaner_Router);
app.use('/AirconditionerControl',Airconditioner_Router);
app.use('/ReservationControl',Reservation_Router);
app.use('/Mode',Mode_Router);
app.use('/getSolutionStatus',get_Solution_Status_Router);
app.use('/Test',TEST_Router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/', (req, res) => {
  if(!req.session.num) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  res.send('Hello ' + req.session.num);
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
