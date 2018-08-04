const TopArtists = require('../models/top.artists');

// module.exports.render = (req, res, next) => {
//     res.render('artists');
// }

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopArtists.find({ userId: id }).sort({createdAt:-1}).limit(1) //ultimo documento 
        .then((artists) => {
            res.render('artists', {artists :artists[0].topArtists});
        })
        .catch(error => next(error))

}

module.exports.statsAndRender = (req, res, next) => {
    // data object to give to the Frontend
    res.render('artists-stats', {});
}

module.exports.globalAndRender = (req, res, next) => {
    res.render('artists-global');
}





