const TopSongs = require('../models/top.songs');

// module.exports.render = (req, res, next) => {
//     res.render('songs');
// }

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopSongs.find({ userId: id }).sort({createdAt:-1}).limit(1) //ultimo documento 
        .then((songs) => {
            if(songs){
                res.render('songs',{ songs: songs[0].topSongs });
            }  
        })
        .catch(error => next(error))
}

module.exports.statsAndRender = (req, res, next) => {
    res.render('songs-stats');
}

module.exports.globalAndRender = (req, res, next) => {
    res.render('songs-global');
}