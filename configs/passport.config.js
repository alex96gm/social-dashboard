const User = require('../models/user.model');
const mongoose = require('mongoose');
const SpotifyStrategy = require('passport-spotify').Strategy;
const serviceSpotify = require('../services/spotify.service');
const utilitiesDTO = require('../utilities/dto.parse');
const TopArtist = require('../models/top.artists');

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



    passport.use('spotify-auth', new SpotifyStrategy({
        clientID: process.env.SPOTIFY_AUTH_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET || '',
        callbackURL: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb',
    }, authenticateOAuthUser));


    function getUserWithPosts(username) {
        return User.findOne({ username: username })
            .populate('posts').exec((err, posts) => {
                console.log("Populated User " + posts);
            })
    }

    function authenticateOAuthUser(accessToken, refreshToken, profile, next) {

        User.findOne({ idSpotify: profile.id })
            .then(user => {
                if (user) {
                    User.findOneAndUpdate(
                        { id_spotify: user.id_spotify },
                        { $set: { accessToken: accessToken, refreshToken: refreshToken } },
                        { new: true })
                        .then((userReturned) => {
                            user = userReturned
                        });
                } else {
                    user = utilitiesDTO.userParser(profile, accessToken, refreshToken);
                    return user.save()
                        .then(user => { })
                }

                return serviceSpotify.getData(accessToken, refreshToken, user)
                    .then((results) => {

                        let artists = utilitiesDTO.topArtistParser(results[0], user);
                        let songs = utilitiesDTO.topSongParser(results[1], user);
                        
                        return Promise.all([
                            artists.save(),
                            songs.save()
                        ]).then(()=>{
                            next(null, user);
                        })
                    })

            })
            .catch(error => next(error));
    }
}

