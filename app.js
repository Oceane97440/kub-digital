//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')

//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');
//var cookieSession = require('cookie-session')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());

//HP
var indexRouter = require('./src/routes/indexRoute');
app.use('/', indexRouter);

//Users
var usersRouter = require('./src/routes/usersRoute');
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
