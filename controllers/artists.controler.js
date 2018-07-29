const TopArtists = require('../models/top.artists');

module.exports.render = (req, res, next) => {
    res.render('artists');
}

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopArtists.findOne({ userId: id }) //ultimo documento 
    .then((topArtists)=>{    
        if(topArtists){
            console.log(topArtists);
            res.render('artists', topArtists);
        }  
    })
    .catch(error => next(error))
    
}