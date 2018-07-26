const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require("spotify-web-api-node");

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

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_AUTH_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb'
    });

    passport.use('spotify-auth', new SpotifyStrategy({
        clientID: process.env.SPOTIFY_AUTH_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET || '',
        callbackURL: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb',
    }, authenticateOAuthUser));

    function authenticateOAuthUser(accessToken, refreshToken, profile, next) {

        User.findOne({ id_spotify: profile.id })
            .then(user => {
                if (user) {
                    User.findOneAndUpdate(
                        { id_spotify: user.id_spotify },
                        { accessToken: accessToken, refreshToken: refreshToken });
                } 

                spotifyApi.setAccessToken(accessToken);
                return Promise.all([
                    spotifyApi.getMyTopArtists(),
                    spotifyApi.getMyTopTracks()
                ])
                .then(results => {
                    const artist = results[0].body;
                    const songs = results[1].body;
                    // return Promise.all(
                    //     //     topArtist.save(),
                    //     //     topSongs.save(),
                    //     ).then(results => {
                    //         return next(null, results[0]);
                    //     })
                    /** PARSEO DE OBJETOS */
                    if(user){
                        next(null, user);
                    }else{
                        user = userParser(profile, accessToken, refreshToken);         
                        return user.save()
                        .then(user => {
                            next(null, user);
                        })
                    }                  
                })
            })
            .catch(error => next(error));
    }
}

function userParser(profile, accessToken, refreshToken){
    return new User({
        email: profile.emails[0].value,
        password: Math.random().toString(36).substring(7),
        id_spotify: profile.id,
        user_name: profile.displayName,
        country: profile.country,
        user_url: profile.profileUrl,
        followers: profile.followers.toString(),
        images: profile.photos,
        product: profile.product,
        type: profile._json.type,
        uri: profile._json.uri,
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}