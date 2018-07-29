const TopArtists = require('../models/top.artists');

module.exports.render = (req, res, next) => {
    res.render('artists');
}

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopArtists.findOne({ userId: id }) //ultimo documento 
    .then((artists)=>{    
        if(artists){
            console.log(artists.topArtists[0].artistImages[0].url);
            res.render('artists', { artists: artists.topArtists});
        }  
    })
    .catch(error => next(error))
    
}