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

//Admin
var adminRouter=require('./src/routes/adminRoute');
app.use('/admin',adminRouter);

//Campagne
var campagneRouter=require('./src/routes/campagneRoute');
app.use('/campagne',campagneRouter);



app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
