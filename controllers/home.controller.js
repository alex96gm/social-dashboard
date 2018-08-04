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
        TopArtists.aggregate([ 
            { $project : {topArtists:
                { artistId : 1 ,} }
            } ]).sort({createdAt:-1}).limit(1)
        ])
        .then((result)=>{
            let artistsIds = result[1][0].topArtists.reduce((acc,item)=>{
                acc.push(item.artistId);
                return acc;
            },[]).slice(0,5)                     
            return serviceSpotify.getRecomendationsAndReleases(result[0].accessToken, result[0].refreshToken, artistsIds)
            .then((results)=>{
                res.render('home',{recomendations:results.recomendations,releases:results.releases});
            })      
        }).catch(error => next(error));
}