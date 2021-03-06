require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');

require('./configs/db.config');
require('./configs/hbs.config.js');
require('./configs/passport.config').setup(passport);

const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const artistsRouter = require('./routes/artists');
const songsRouter = require('./routes/songs');
const apiRouter = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  force:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user;
  res.locals.path = req.path;
  next();
})
app.use('/api', apiRouter);
app.use('/songs', songsRouter);
app.use('/artists', artistsRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/', function(req, res) {
  res.redirect('/login');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (req.headers.accept === 'application/json') {
    res.json(err);
  } else {
    res.render('error');
  }
});

module.exports = app;
