/*
* 
* version: 0.1.0
* API server for FindHealth Platform
*
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var v1Router = require('./routes/v1');
var v2Router = require('./routes/v2');

// init : Express Application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// my Modules ===========
// SaumyaLogger: Logs the Details in the console
const SaumyaLogger = require('./saumya/SaumyaLogger');
const SaumyaCORS = require('./saumya/SaumyaCORS');

app.use(SaumyaLogger);
app.use(SaumyaCORS);
// my Modules / ===========

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

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
  res.render('error');
});


//
// Initialising the ModelFactory so that we can use 'sequelize' object everywhere in the Application
//
//----------------------------- Model Factory : init : -------------------------------------
const modelFactory = require('./model/model.factory');
// Makes the connection to ORM and makes the models ready to be used
modelFactory.initModelFactory(onModelFactoryInitDone,onModelFactoryInitFail);
// Callbacks from the ORM initialiser above
function onModelFactoryInitDone(sequelize){
    console.log('app.js: onModelFactoryInitDone');
    console.log('+----------------------------+');
    console.log('| Application: Init : Done   |');
    console.log('+----------------------------+');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('Waiting for API calls');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
}
function onModelFactoryInitFail(error){
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('app.js: onModelFactoryInitFail :  : ');
    console.log('+----------------------------+');
    console.log('| Application: Init : Fail   |');
    console.log('+----------------------------+');
    //console.log('error');
    console.log( error );
    console.log('app.js: onModelFactoryInitFail : / : ');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('+-------------------------------+');
    console.log('| FAIL : Application Init       |');
    console.log('+-------------------------------+');
    console.log('This is the last line. All the messages are shown above.');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
}
//----------------------------- Model Factory : init : / -----------------------------------



module.exports = app;
