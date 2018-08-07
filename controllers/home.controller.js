// module.exports.render = (req, res, next) => {
//     res.render('home');
// }
const TopArtists = require('../models/top.artists');
const User = require('../models/user.model');
const serviceSpotify =require('../services/spotify.service');

module.exports.postRender = (req, res, next) => {
    let id = req.user._id;
    return Promise.all([
        User.findOne({ _id: id }),
        TopArtists.find({userId : id}).sort({createdAt:-1}).limit(1)
        ])
        .then((result)=>{
            let artistsIds = result[1][0].topArtists.filter((artist, index) => index < 5).map(artist => artist.artistId)                 
            serviceSpotify.getRecomendationsAndReleases(result[0].accessToken, result[0].refreshToken, artistsIds)
                .then((results)=>{
                    if(results.recomendations){
                        res.render('home',{recomendations:results.recomendations.slice(0,6), releases:results.releases.slice(0,6)});
                    }else{
                        res.render('home',{recomendations:null, releases:results.releases.slice(0,6)});
                    }
                })      
                .catch(error => {
                    res.render('home')
                });
        }).catch(error => next(error));
}