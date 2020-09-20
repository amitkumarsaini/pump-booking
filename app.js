var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const logDirectory = path.join(__dirname, "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const uploadDirectory = path.join(__dirname, "uploads");
fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory);
// Build the connection string
const dbURI = process.env.DB_URl;

// Create the database connection
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log(dbURI);
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ");
    throw err;
  });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
