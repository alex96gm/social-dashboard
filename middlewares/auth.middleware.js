const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    if (req.headers.accept === 'application/json') {
      next(createError(401));
    } else {
      res.redirect('login');
    }
  }
}

module.exports.userNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("home"); 
   
  }
}