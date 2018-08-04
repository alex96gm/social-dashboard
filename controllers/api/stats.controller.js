const TopArtists = require('../../models/top.artists');

module.exports.getTopArtistData = (req, res, next) => {
    TopArtists.find({ userId: req.user._id },{topArtists:1, _id:0}).sort({createdAt:-1}).limit(1)
        .then((artists) => {
            res.json(artists);
        })
        .catch(error => next(error));  
}

// module.exports.getTopArtistPopularity = (req, res, next) => {
//     TopArtists.aggregate([ 
//         { $project : {topArtists:
//             { artistName : 1 , artistPopularity : 1 } }
//         } ]).sort({createdAt:-1}).limit(1)
//         .then((artists) => {
//             res.json(artists);
//         })
//         .catch(error => next(error));
// }