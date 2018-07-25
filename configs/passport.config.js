const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports.setup = (passport) => {

    passport.serializeUser((user, next) => {
        next(null, user._id);
    });

    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(user => {
                next(null, user);
            })
            .catch(error => next(error));
    });

    passport.use('spotify-auth',new SpotifyStrategy({
        clientID: process.env.SPOTIFY_AUTH_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET || '',
        callbackURL: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb',
    },authenticateOAuthUser));

    function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
        
    User.findOne({ id_spotify: profile.id })
      .then(user => {
        if (user) {
            console.log(profile);
          next(null, user);
        } else {    
            user = new User({
            email: profile.emails[0].value,
            password: Math.random().toString(36).substring(7),
            id_spotify:profile.id,
            user_name: profile.displayName,
            country:profile.country,
            user_url:profile.profileUrl,
            followers:profile.followers.toString(),
            images:profile.photos,
            product:profile.product,
            type:profile._json.type,
            uri:profile._json.uri
          })
          return user.save()
            .then(user => {
              next(null, user);
            });
        }
      })
      .catch(error => next(error));
    }
}