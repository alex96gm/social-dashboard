const TopSongs = require('../models/top.songs');

// module.exports.render = (req, res, next) => {
//     res.render('songs');
// }

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopSongs.find({ userId: id }) //ultimo documento 
        .then((songs) => {
            let song = songs[(songs.length) - 1]
            if(song){
                console.log(song.topSongs[0]);
                res.render('songs',{ songs: song.topSongs });
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