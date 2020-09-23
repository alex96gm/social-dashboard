const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;
const serviceSpotify = require('../services/spotify.service');
const utilitiesDTO = require('../utilities/dto.parse');
const TopArtists = require('../models/top.artists');


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



    passport.use(new SpotifyStrategy({
        clientID: process.env.SPOTIFY_AUTH_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET || '',
        callbackURL: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb',
    }, authenticateOAuthUser));


    function authenticateOAuthUser(accessToken, refreshToken, profile, next) {

        User.findOne({ idSpotify: profile.id })
            .then(user => {
                if (user) {
                    User.findOneAndUpdate(
                        { _id: user._id },
                        { $set: { accessToken: accessToken, refreshToken: refreshToken } },
                        { new: true })
                        .then((userReturned) => {
                            user = userReturned
                            _getData(accessToken , refreshToken, user);
                        });
                } else {
                    user = utilitiesDTO.userParser(profile, accessToken, refreshToken);
                    return user.save()
                        .then(user => {
                            _getData(accessToken , refreshToken, user);
                        })
                }

                function _getData(accessToken , refreshToken, user){
                    return serviceSpotify.getData(accessToken, refreshToken, user)
                    .then((results) => {
                        
                        let artists = utilitiesDTO.topArtistParser(results[0], user);
                        let songs = utilitiesDTO.topSongParser(results[1], user);
                        
                        return Promise.all([
                            artists.save(),
                            songs.save(),                          
                        ]).then((result)=>{
                                next(null, user);    
                        })
                    })
                }
            })
            .catch(error => next(error));
    }
}

