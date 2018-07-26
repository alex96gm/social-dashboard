
const passport = require('passport');

module.exports.render = (req, res, next) => {
    res.render('login');
}

module.exports.createWithIDPCallback = (req, res, next) => {
    
    passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
        if (error) {
            next(error);
        } else {
            
            req.login(user, (error) => {
                if (error) {
                    next(error)
                } else {

                    res.redirect(`/home`);                    
                }
            });
        }
    })(req, res, next);
}