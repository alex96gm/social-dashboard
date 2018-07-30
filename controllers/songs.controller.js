const TopSongs = require('../models/top.songs');

module.exports.render = (req, res, next) => {
    res.render('songs');
}

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopSongs.findOne({ userId: id }) //ultimo documento 
    .then((songs)=>{    
        if(songs){
            console.log(songs.topSongs[0]);
            res.render('songs',{ songs: songs.topSongs });
        }  
    })
    .catch(error => next(error))
}