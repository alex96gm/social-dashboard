const TopArtists = require('../../models/top.artists');
const TopSongs = require('../../models/top.songs');

module.exports.getTopArtistData = (req, res, next) => {
    TopArtists.find({ userId: req.user._id },{topArtists:1, _id:0}).sort({createdAt:-1}).limit(1)
        .then((artists) => {
            res.json(artists);
        })
        .catch(error => next(error));  
}

module.exports.getTopSongsData = (req, res, next) => {
    TopSongs.find({ userId: req.user._id },{topSongs:1, _id:0}).sort({createdAt:-1}).limit(1)
        .then((songs) => {
            res.json(songs);
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