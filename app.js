var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var v1Router = require('./routes/v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --------- CORS ------------------
// ref: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// --------- CORS / ------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', v1Router);

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
modelFactory.initModelFactory(onModelFactoryInitDone,onModelFactoryInitFail);
function onModelFactoryInitDone(sequelize){
    console.log('app.js: onModelFactoryInitDone');
    console.log('+----------------------------+');
    console.log('| Application: Init : Done   |');
    console.log('+----------------------------+');
    //console.log('sequelize',sequelize);
    
    //sequelize = modelFactory.getORMRef();
    //console.log(sequelize);
    
    //modelFactory.initTheModels();
}
function onModelFactoryInitFail(error){
    console.log('app.js: onModelFactoryInitFail');
    console.log('error',error);
}
//----------------------------- Model Factory : init : / -----------------------------------



module.exports = app;
